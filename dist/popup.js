document.addEventListener("DOMContentLoaded",(function(){const e=document.getElementById("mainButton"),t=document.getElementById("savedLinks"),n=document.getElementById("groupList"),l=JSON.parse(localStorage.getItem("groups"))||[];let a=JSON.parse(localStorage.getItem("openGroups"))||[];const o=document.getElementById("myModal"),d=document.getElementById("closeModal"),i=document.getElementById("saveButton"),s=document.getElementById("title"),c=document.getElementById("url"),r=document.getElementById("group");function u(){o.style.display="none",s.value="",c.value="",r.value=""}function p(){t.innerHTML="";const e=JSON.parse(localStorage.getItem("savedLinks"))||[];if(0===e.length){const e=document.createElement("p");e.textContent="Нет сохраненных записей.",t.appendChild(e)}else e.forEach(((e,n)=>{if(!a.includes(e.group))return;const o=document.createElement("li"),d=document.createElement("p"),i=document.createElement("button"),s=document.createElement("button"),c=document.createElement("button"),r=document.createElement("div");c.classList.add("go-link-button"),c.textContent="Переход",o.addEventListener("click",(t=>{return n=e.url,void window.open(n);var n})),s.classList.add("copy-link-button"),s.textContent="Копировать",s.addEventListener("click",(t=>function(e,t){e.stopPropagation();const n=document.createElement("div"),l=document.createElement("p");l.classList.add("alert__text"),n.classList.add("alert_hide"),navigator.clipboard.writeText(t).then((()=>{l.textContent="Успешно скопировано",n.classList.replace("alert_hide","alert_show"),n.appendChild(l),document.body.appendChild(n)})).catch((e=>{l.textContent="Ошибка",n.classList.replace("alert_hide","alert_show"),n.appendChild(l),document.body.appendChild(n)})).finally((()=>{setTimeout((()=>{n.classList.replace("alert_show","alert_hide")}),1e3)}))}(t,e.url))),i.classList.add("delete-button"),i.textContent="Удалить",i.addEventListener("click",(e=>function(e,t){e.stopPropagation();const n=JSON.parse(localStorage.getItem("savedLinks"))||[],a=n.splice(t,1)[0];localStorage.setItem("savedLinks",JSON.stringify(n)),a.group&&n.every((e=>e.group!==a.group))&&(l.splice(l.indexOf(a.group),1),localStorage.setItem("groups",JSON.stringify(l))),p()}(e,n))),d.textContent=`${e.title}`,d.classList.add("title"),o.appendChild(d),r.appendChild(c),r.appendChild(s),r.appendChild(i),o.appendChild(r),t.appendChild(o)}));n.innerHTML="<div>Фильтр категорий:</div>",l.forEach((e=>{const t=document.createElement("div");t.classList.add("group-item"),a.includes(e)&&t.classList.add("active"),t.textContent=e,t.addEventListener("click",(()=>m(e))),n.appendChild(t)}))}function m(e){a.includes(e)?a=a.filter((t=>t!==e)):a.push(e),localStorage.setItem("openGroups",JSON.stringify(a)),p()}e.addEventListener("click",(function(){o.style.display="block",s.value="",c.value="",r.value=""})),d.addEventListener("click",u),i.addEventListener("click",(function(){const e=s.value.trim(),t=c.value.trim(),n=r.value.trim()||"Без категории";e&&t?(function(e,t,n){const a=JSON.parse(localStorage.getItem("savedLinks"))||[];a.push({title:e,url:t,group:n}),localStorage.setItem("savedLinks",JSON.stringify(a)),n&&!l.includes(n)&&(l.push(n),localStorage.setItem("groups",JSON.stringify(l)),m(n))}(e,t,n),p(),u()):alert("Пожалуйста, введите корректное описание и URL.")})),p()}));