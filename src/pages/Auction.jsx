import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import MouseEffects from "../components/MouseEffects";
import PlayerModal from "../components/PlayerModal";
import TeamSquadModal from "../components/TeamSquadModal";
import { categories, players, teams } from "../data/players";

const TEAM_BUDGET = 3000;

export default function Auction(){
 const [category,setCategory]=useState("A+"),[query,setQuery]=useState(""),[selected,setSelected]=useState(null),[selectedTeam,setSelectedTeam]=useState(null);
 const [bids,setBids]=useState(()=>Object.fromEntries(players.map(p=>[p.id,p.currentBid])));
 const [sales,setSales]=useState(()=>{
  try{
    const raw=JSON.parse(localStorage.getItem("ppl-s9-sales-v4")||"[]");
    const seen=new Set();
    return raw.filter(s=>{
      const key=`${s.team}::${s.category}`;
      if(seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }catch{return []}
});
 const filtered=useMemo(()=>{const q=query.trim().toLowerCase();return players.filter(p=>p.category===category&&p.name.toLowerCase().includes(q))},[category,query]);
 const updateBid=(id,value)=>{const digits=String(value).replace(/[^0-9]/g,"");setBids(x=>({...x,[id]:digits===""?"":Number(digits)}))};
 const soldIds=new Set(sales.map(s=>s.playerId));
 const saveSales=(next)=>{setSales(next);try{localStorage.setItem("ppl-s9-sales-v4",JSON.stringify(next))}catch{}};
 const teamSpent=teams.reduce((out,t)=>{out[t]=sales.filter(s=>s.team===t).reduce((sum,s)=>sum+s.price,0);return out},{});
 const teamBalance=teams.reduce((out,t)=>{out[t]=TEAM_BUDGET-(teamSpent[t]||0);return out},{});
 const selectedWithBid=selected?{...selected,currentBid:Number(bids[selected.id]||0),isSold:soldIds.has(selected.id)}:null;
 const teamHasCategory=(team,category,excludePlayerId=null)=>sales.some(s=>s.team===team&&s.category===category&&s.playerId!==excludePlayerId);
 const handleSold=(playerId,team,price)=>{
   const amount=Number(price||0);
   const available=Number(teamBalance[team] ?? 0);
   if(!team || amount<=0 || amount>available) return {ok:false,reason:`${team} कडे फक्त ₹${available.toLocaleString("en-IN")} शिल्लक आहेत. ₹${amount.toLocaleString("en-IN")} ला SOLD करता येणार नाही.`};
   if(soldIds.has(playerId)) return {ok:false,reason:"हा खेळाडू आधीच SOLD झाला आहे."};
   const p=players.find(x=>x.id===playerId);
   if(!p) return {ok:false,reason:"Player सापडला नाही."};
   if(teamHasCategory(team,p.category,playerId)) return {ok:false,reason:`${team} ने ${p.category} group मधून आधीच player घेतला आहे. या team ला या group मधून दुसरा player घेता येणार नाही.`};
   const next=[...sales,{playerId,name:p.name,team,price:amount,category:p.category}];
   saveSales(next);
   setSelected(null);
   return {ok:true};
 };
 return <div className="site auction-page"><MouseEffects/><Navbar/><main className="auction-wrap">
  <div className="auction-heading"><div><p className="eyebrow">PPL • SEASON 9 • LIVE AUCTION</p><h1>तुमचा <span>ड्रीम XI.</span></h1><p>खेळाडू निवडा, bid बदला आणि auction सुरू करा.</p></div><div className="live-pill"><i/> AUCTION LIVE</div></div>

  <section className="budget-board">
   <div className="board-title"><div><p className="eyebrow">TEAM PURSE • LIVE</p><h2>प्रत्येक संघाचे <span>Budget</span></h2></div><strong>₹{TEAM_BUDGET.toLocaleString("en-IN")} / TEAM</strong></div>
   <div className="team-budget-grid">{teams.map(team=><article className="team-budget-card team-clickable" key={team} onClick={()=>setSelectedTeam(team)} role="button" tabIndex={0} onKeyDown={e=>e.key==="Enter"&&setSelectedTeam(team)}><div className="team-budget-top"><h3>{team}</h3><span>{sales.filter(s=>s.team===team).length} SOLD</span></div><div className="team-budget-balance"><small>BALANCE</small><b className={teamBalance[team]<500?"low":""}>₹{teamBalance[team].toLocaleString("en-IN")}</b></div><div className="budget-track"><i style={{width:`${Math.min(100,(teamSpent[team]/TEAM_BUDGET)*100)}%`}}/></div><div className="team-budget-bottom"><span>SPENT ₹{teamSpent[team].toLocaleString("en-IN")}</span><span>₹{TEAM_BUDGET.toLocaleString("en-IN")}</span></div></article>)}</div>
  </section>

  <div className="toolbar"><div className="categories">{categories.map(c=><button key={c} className={category===c?"selected":""} onClick={()=>setCategory(c)}>{c}</button>)}</div><div className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="खेळाडू शोधा..."/></div></div>
  <div className="auction-grid">{filtered.map((p,i)=>{const isSold=soldIds.has(p.id);return <article key={p.id} className={`player-card ${isSold?"player-sold":""}`} style={{"--delay":`${i*45}ms`}}>
   <button className="player-card-main" onClick={()=>!isSold&&setSelected(p)} disabled={isSold}><div className="card-image"><img src={p.image} alt={p.name}/><span>{isSold?"SOLD":p.category}</span>{isSold&&<b className="sold-card-stamp">🏆 SOLD</b>}</div><div className="card-body"><div><small>{p.role}</small><h2>{p.name}</h2></div><span className="arrow">{isSold?"✓":"↗"}</span></div></button>
   <div className="card-price"><span>BASE ₹{p.basePrice.toLocaleString("en-IN")}</span>{!isSold?<label className="card-bid-input"><small>CURRENT BID</small><span>₹</span><input type="number" min="0" step="10" value={bids[p.id]??""} onChange={e=>updateBid(p.id,e.target.value)} onClick={e=>e.stopPropagation()}/></label>:<span className="sold-mini">SOLD TO {sales.find(s=>s.playerId===p.id)?.team}</span>}</div>
  </article>})}</div>{!filtered.length&&<div className="empty">या category मध्ये खेळाडू सापडला नाही.</div>}

  <section className="sales-board"><div className="sales-heading"><div><p className="eyebrow">AUCTION LEDGER</p><h2>कोण <span>कुठे गेला?</span></h2></div><b>{sales.length} PLAYERS SOLD</b></div>{sales.length===0?<div className="empty sales-empty">अजून कोणताही player SOLD झालेला नाही. Player उघडा आणि SOLD करा.</div>:<div className="sales-list">{sales.map((s,i)=><div className="sale-row" key={`${s.playerId}-${i}`}><span className="sale-no">{String(i+1).padStart(2,"0")}</span><div><strong>{s.name}</strong><small>{s.category}</small></div><div className="sale-team"><span>TEAM</span><b>{s.team}</b></div><div className="sale-price"><span>SOLD FOR</span><b>₹{s.price.toLocaleString("en-IN")}</b></div></div>)}</div>}</section>
  </main>{selectedTeam&&<TeamSquadModal team={selectedTeam} sales={sales} onClose={()=>setSelectedTeam(null)}/>} {selectedWithBid&&<PlayerModal player={selectedWithBid} bid={bids[selected.id]} teams={teams} teamBalance={teamBalance} teamHasCategory={teamHasCategory} onBidChange={v=>updateBid(selected.id,v)} onSold={handleSold} onClose={()=>setSelected(null)}/>}</div>;
}
