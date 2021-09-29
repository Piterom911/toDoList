(this.webpackJsonp003=this.webpackJsonp003||[]).push([[0],{108:function(t,e,a){"use strict";a.r(e);var n=a(0),c=a.n(n),r=a(9),s=a.n(r);a(81),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(82);var i,u,o=a(30),l=a(150),d=a(140),b=a(141),j=a(5),O=c.a.memo((function(t){var e=Object(n.useState)(""),a=Object(o.a)(e,2),c=a[0],r=a[1],s=Object(n.useState)(""),i=Object(o.a)(s,2),u=i[0],O=i[1],f=Object(n.useCallback)((function(){""!==c.trim()?t.addNewItem(c):O("This field is required!"),r("")}),[c,t.addNewItem]),p=Object(n.useCallback)((function(t){r(t.currentTarget.value),u&&O("")}),[u]),h=Object(n.useCallback)((function(t){"Enter"===t.key&&f()}),[f]);return Object(j.jsxs)("div",{className:"listInputAria",children:[Object(j.jsx)(l.a,{variant:"outlined",size:"small",label:"New item name",title:"Here you can add a new item to the list",helperText:u,error:!!u,onKeyPress:h,onChange:p,value:c}),Object(j.jsx)(d.a,{color:"primary",onClick:f,children:Object(j.jsx)(b.a,{})})]})})),f=a(67),p=a.n(f).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"api-key":"18e1d480-771d-4bcb-b6a1-86b6a255bc4b"}});!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(i||(i={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(u||(u={}));var h=function(){return p.get("todo-lists")},k=function(t){return p.post("todo-lists",{title:t})},m=function(t){return p.delete("todo-lists/".concat(t))},v=function(t,e){return p.put("todo-lists/".concat(t),{title:e})},T=function(t){return p.get("todo-lists/".concat(t,"/tasks"))},D=function(t,e){return p.post("todo-lists/".concat(t,"/tasks"),{title:e})},x=function(t,e,a){return p.put("todo-lists/".concat(t,"/tasks/").concat(e),a)},I=function(t,e){return p.delete("todo-lists/".concat(t,"/tasks/").concat(e))},C=c.a.memo((function(t){var e=Object(n.useState)(!1),a=Object(o.a)(e,2),c=a[0],r=a[1],s=Object(n.useState)(""),u=Object(o.a)(s,2),d=u[0],b=u[1],O=Object(n.useCallback)((function(){r(!0),b(t.title)}),[r,b,t.title]),f=Object(n.useCallback)((function(e){t.changeItemValue(e.currentTarget.value),r(!1)}),[t.changeItemValue,r]),p=Object(n.useCallback)((function(t){b(t.currentTarget.value)}),[b]),h=Object(n.useCallback)((function(e){"Enter"===e.key&&(t.changeItemValue(d),r(!1))}),[t.changeItemValue,r,d]);return c?Object(j.jsx)(l.a,{onKeyPress:h,onChange:p,onBlur:f,value:d,autoFocus:!0,type:"text"}):Object(j.jsxs)("span",{onDoubleClick:O,className:t.status===i.Completed?"doneTask":"inProcess",children:[t.title," "]})})),w=a(109),g=a(143),S=a(142),y=a(151),E=function(t){var e=Object(n.useCallback)((function(e){t.changeItemValue(t.tdlID,t.task.id,e)}),[t.tdlID,t.task.id]),a=Object(n.useCallback)((function(){t.removeTask(t.tdlID,t.task.id)}),[t.removeTask,t.tdlID,t.task.id]),c=Object(n.useCallback)((function(e){console.log(t.task.status,e.currentTarget.checked),t.changeStatus(t.tdlID,t.task.id,e.currentTarget.checked?i.Completed:i.New)}),[t.changeStatus,t.tdlID,t.task.id]);return Object(j.jsxs)("li",{className:"listItem",children:[Object(j.jsx)(y.a,{className:"itemCheckBox",color:"primary",onChange:c,checked:t.task.status===i.Completed}),Object(j.jsx)(C,{changeItemValue:e,status:t.task.status,title:t.task.title}),Object(j.jsx)(d.a,{className:"iconTrash",onClick:a,children:Object(j.jsx)(S.a,{})})]},t.task.id)},L=a(23),N=a(13),A=a.n(N),V=a(19),K=a(42),H=a(24),M=a(11),R={},G=function(t,e){return{type:"SET-TASKS",tdlID:t,tasks:e}},P=function(t,e){return{type:"REMOVE-TASK",tdlID:t,id:e}},W=function(t,e){return{type:"ADD-NEW-TASK",tdlID:t,taskData:e}},B=function(t,e,a){return{type:"CHANGE-TASK",tdlID:t,id:e,newData:a}},F=function(t,e,a){return function(){var n=Object(V.a)(A.a.mark((function n(c,r){var s,i;return A.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(s=r().tasks[t].find((function(t){return t.id===e}))){n.next=4;break}return console.warn("There is no such taskID"),n.abrupt("return");case 4:return i=Object(M.a)({title:s.title,description:s.description,priority:s.priority,status:s.status,deadline:s.deadline,startDate:s.startDate},a),n.next=7,x(t,e,i);case 7:c(B(t,e,i));case 8:case"end":return n.stop()}}),n)})));return function(t,e){return n.apply(this,arguments)}}()},U=c.a.memo((function(t){var e=Object(L.b)();Object(n.useEffect)((function(){var a;e((a=t.id,function(){var t=Object(V.a)(A.a.mark((function t(e){var n;return A.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,T(a);case 2:n=t.sent,e(G(a,n.data.items));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()))}),[]);var a=t.tasks;"active"===t.filterStatus&&(a=a.filter((function(t){return t.status===i.New}))),"completed"===t.filterStatus&&(a=a.filter((function(t){return t.status===i.Completed})));var c=a.map((function(e){return Object(j.jsx)(E,{removeTask:t.removeTask,changeItemValue:t.changeItemValue,changeStatus:t.changeStatus,tdlID:t.id,task:e},e.id)})),r=Object(n.useCallback)((function(){return t.removeToDoList(t.id)}),[t.id,t.removeToDoList]),s=Object(n.useCallback)((function(){return t.filterTasks(t.id,"all")}),[t.filterTasks,t.id]),u=Object(n.useCallback)((function(){return t.filterTasks(t.id,"active")}),[t.filterTasks,t.id]),o=Object(n.useCallback)((function(){return t.filterTasks(t.id,"completed")}),[t.filterTasks,t.id]),l=Object(n.useCallback)((function(e){t.addNewTask(t.id,e)}),[t.addNewTask,t.id]),b=Object(n.useCallback)((function(e){t.onChangeListName(t.id,e)}),[t.onChangeListName,t.id]);return Object(j.jsxs)(w.a,{style:{padding:"15px"},children:[Object(j.jsxs)("h3",{children:[Object(j.jsx)(C,{status:i.New,title:t.heading,changeItemValue:b}),Object(j.jsx)(d.a,{onClick:r,children:Object(j.jsx)(S.a,{})})]}),Object(j.jsx)(O,{addNewItem:l}),Object(j.jsx)("ul",{className:"listWrapper",children:c}),Object(j.jsxs)("div",{children:[Object(j.jsx)(g.a,{color:"primary",disabled:"all"===t.filterStatus,variant:"all"===t.filterStatus?"outlined":"contained",onClick:s,children:"All"}),Object(j.jsx)(g.a,{color:"secondary",disabled:"active"===t.filterStatus,variant:"active"===t.filterStatus?"outlined":"contained",onClick:u,children:"Active"}),Object(j.jsx)(g.a,{color:"default",disabled:"completed"===t.filterStatus,variant:"completed"===t.filterStatus?"outlined":"contained",onClick:o,children:"Completed"})]})]})})),J=a(144),q=a(145),z=a(147),$=a(148),Q=a(149),X=a(146),Y=a(152),Z=[],_=function(t){return{type:"ADD-TODOLIST",title:t,tdlID:Object(Y.a)()}},tt=function(t,e){return{type:"CHANGE-TODOLIST-TITLE",id:t,title:e}},et=c.a.memo((function(){var t=Object(L.c)((function(t){return t.toDoLists})),e=Object(L.c)((function(t){return t.tasks})),a=Object(L.b)();Object(n.useEffect)((function(){a(function(){var t=Object(V.a)(A.a.mark((function t(e){var a;return A.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,h();case 2:a=t.sent,e({type:"SET-TO-DO-LISTS",tdls:a.data});case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}),[]);var c=Object(n.useCallback)((function(t){var e;a((e=t,function(){var t=Object(V.a)(A.a.mark((function t(a){return A.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,m(e);case 2:a({type:"REMOVE-TODOLIST",tdlID:e});case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()))}),[a]),r=Object(n.useCallback)((function(t,e){var n,c;a((n=t,c=e,function(){var t=Object(V.a)(A.a.mark((function t(e){return A.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v(n,c);case 2:e(tt(n,c));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()))}),[a]),s=Object(n.useCallback)((function(t,e,n){a(F(t,e,{title:n}))}),[a]),i=Object(n.useCallback)((function(t,e){a({type:"CHANGE-TODOLIST-FILTER",id:t,status:e})}),[a]),u=Object(n.useCallback)((function(t,e){a(function(t,e){return function(){var a=Object(V.a)(A.a.mark((function a(n){return A.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,I(t,e);case 2:n(P(t,e));case 3:case"end":return a.stop()}}),a)})));return function(t){return a.apply(this,arguments)}}()}(t,e))}),[a]),o=Object(n.useCallback)((function(t,e){a(function(t,e){return function(){var a=Object(V.a)(A.a.mark((function a(n){var c;return A.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,D(t,e);case 2:c=a.sent,n(W(t,c.data.data.item));case 4:case"end":return a.stop()}}),a)})));return function(t){return a.apply(this,arguments)}}()}(t,e))}),[a]),l=Object(n.useCallback)((function(t,e,n){a(F(t,e,{status:n}))}),[a]),b=Object(n.useCallback)((function(t){var e;a((e=t,function(){var t=Object(V.a)(A.a.mark((function t(a){return A.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,k(e);case 2:a(_(e));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()))}),[a]);return Object(j.jsxs)("div",{children:[Object(j.jsx)(J.a,{position:"static",children:Object(j.jsxs)(q.a,{variant:"dense",children:[Object(j.jsx)(d.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(j.jsx)(X.a,{})}),Object(j.jsx)(z.a,{variant:"h6",color:"inherit",children:"My To Do Lists"})]})}),Object(j.jsxs)($.a,{children:[Object(j.jsx)("div",{className:"addNewList",children:Object(j.jsxs)(w.a,{style:{padding:"15px"},children:[Object(j.jsx)("h2",{style:{margin:0},children:"Add New List"}),Object(j.jsx)(O,{addNewItem:b})]})}),Object(j.jsx)(Q.a,{container:!0,spacing:2,children:t.map((function(t){return Object(j.jsx)(Q.a,{item:!0,children:Object(j.jsx)(U,{id:t.id,heading:t.title,tasks:e[t.id],removeTask:u,filterTasks:i,addNewTask:o,changeStatus:l,filterStatus:t.status,removeToDoList:c,changeItemValue:s,onChangeListName:r})},t.id)}))})]})]})})),at=a(44),nt=a(68),ct=Object(at.b)({toDoLists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Z,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET-TO-DO-LISTS":return e.tdls.map((function(t){return Object(M.a)(Object(M.a)({},t),{},{status:"all"})}));case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.tdlID}));case"ADD-TODOLIST":return[{title:e.title,id:e.tdlID,status:"all",order:0,addedDate:""}].concat(Object(K.a)(t));case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.id?Object(M.a)(Object(M.a)({},t),{},{title:e.title}):t}));case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.id?Object(M.a)(Object(M.a)({},t),{},{status:e.status}):t}));default:return t}},tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET-TO-DO-LISTS":var a=Object(M.a)({},t);return e.tdls.forEach((function(t){return a[t.id]=[]})),a;case"SET-TASKS":return Object(M.a)(Object(M.a)({},t),{},Object(H.a)({},e.tdlID,e.tasks));case"REMOVE-TASK":return Object(M.a)(Object(M.a)({},t),{},Object(H.a)({},e.tdlID,t[e.tdlID].filter((function(t){return t.id!==e.id}))));case"ADD-NEW-TASK":return Object(M.a)(Object(M.a)({},t),{},Object(H.a)({},e.tdlID,[e.taskData].concat(Object(K.a)(t[e.tdlID]))));case"CHANGE-TASK":return Object(M.a)(Object(M.a)({},t),{},Object(H.a)({},e.tdlID,t[e.tdlID].map((function(t){return t.id===e.id?Object(M.a)(Object(M.a)({},t),e.newData):t}))));case"ADD-TODOLIST":return Object(M.a)(Object(M.a)({},t),{},Object(H.a)({},e.tdlID,[]));case"REMOVE-TODOLIST":var n=Object(M.a)({},t);return delete n[e.tdlID],n;default:return t}}}),rt=Object(at.c)(ct,Object(at.a)(nt.a));window.store=rt,s.a.render(Object(j.jsx)(L.a,{store:rt,children:Object(j.jsx)(et,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},81:function(t,e,a){},82:function(t,e,a){}},[[108,1,2]]]);
//# sourceMappingURL=main.461be3e0.chunk.js.map