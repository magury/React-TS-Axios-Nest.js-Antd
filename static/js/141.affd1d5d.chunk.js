"use strict";(self.webpackChunkmy_react_app=self.webpackChunkmy_react_app||[]).push([[141],{5141:(e,s,a)=>{a.r(s),a.d(s,{default:()=>j});var t=a(2791),r=a(1046),l=a(1082),i=a(9096),n=a(8526),m=a(9389),o=a(1532),d=a(2556),p=a(7917),c=a(1117),u=a(1635),h=a(8186),x=a(5772),Z=a(184);const g={labelCol:{},wrapperCol:{xs:{span:24},sm:{span:14}}},j=()=>{const e=(0,x.f_)(),[s,a]=(0,t.useState)([{title:"\u8d26\u53f7",dataIndex:"username"},{title:"\u5bc6\u7801",dataIndex:"password"},{title:"\u533b\u9662\u540d\u79f0",dataIndex:"hospitalName",filters:e.filter,onFilter:(e,s)=>s.hospitalName.startsWith(e),filterSearch:!0},{title:"\u533b\u751f",dataIndex:"author"},{title:"\u79d1\u5ba4",dataIndex:"depart"},{title:"Action",key:"action",render:(e,s)=>(0,Z.jsx)(r.Z,{size:"middle",children:(0,Z.jsx)(l.Z,{title:"Sure to delete?",onConfirm:()=>b(s),children:(0,Z.jsx)("a",{children:"Delete"})})})}]),[j,f]=(0,t.useState)(e.data),[w,y]=i.ZP.useNotification(),[I,N]=(0,t.useState)(e.hospital),b=async e=>{const s={hospitalId:e.key,username:e.username},a=await(0,h.om)(s);200==a.statusCode?(v(a),C("\u6210\u529f\u5220\u9664\u4e86\u8be5\u7528\u6237\u7684\u6570\u636e")):k(a.result.err)},v=e=>{let t=e.result.map(((e,s)=>({key:e.hospitalId,username:e.username,password:e.password,author:e.author,hospitalName:e.hospitalName,depart:e.depart}))),r=s[2];r.filters=t.map((e=>({text:e.hospitalName,value:e.hospitalName}))),null===s||void 0===s||s.splice(2,1,r);let l=null===s||void 0===s?void 0:s.map((e=>e));a(l),f(t.reverse())},C=e=>{w.open({message:"\u64cd\u4f5c\u6210\u529f",description:e,icon:(0,Z.jsx)(c.Z,{style:{color:"#108ee9"}}),placement:"topLeft"})},k=e=>{w.open({message:"\u64cd\u4f5c\u9519\u8bef",description:e,icon:(0,Z.jsx)(u.Z,{style:{color:"#108ee9"}}),placement:"topLeft"})};return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(n.Z,{onFinish:async e=>{const s=await(0,h.FC)(e);200==s.statusCode?(C("\u6210\u529f\u6dfb\u52a0\u8be5\u7528\u6237\u4fe1\u606f\uff01"),v(s)):k(s.result.err)},className:" grid grid-rows-2 grid-cols-3",...g,variant:"filled",children:[y,(0,Z.jsx)(n.Z.Item,{validateFirst:!0,label:"\u8d26\u53f7",name:"username",rules:[{required:!0,message:"\u8d26\u53f7\u4e0d\u80fd\u4e3a\u7a7a"},{min:8,type:"string",message:"\u6700\u77ed\u957f\u5ea6\u4e0d\u80fd\u5c11\u4e8e8\u4f4d"},{pattern:/^[A-Za-z0-9]+$/,message:"\u8d26\u53f7\u53ea\u80fd\u5305\u542b\u5b57\u6bcd\u548c\u6570\u5b57"},{whitespace:!0,message:"\u4e0d\u80fd\u4f7f\u7528\u7a7a\u683c"}],children:(0,Z.jsx)(m.Z,{})}),(0,Z.jsx)(n.Z.Item,{label:"\u59d3\u540d",name:"author",rules:[{required:!0,message:"\u59d3\u540d\u4e0d\u80fd\u4e3a\u7a7a!"}],children:(0,Z.jsx)(m.Z,{})}),(0,Z.jsx)(n.Z.Item,{label:"\u79d1\u5ba4",name:"depart",rules:[{required:!0,message:"\u79d1\u5ba4\u4e0d\u80fd\u4e3a\u7a7a!"}],children:(0,Z.jsx)(m.Z,{})}),(0,Z.jsx)(n.Z.Item,{validateFirst:!0,label:"\u5bc6\u7801",name:"password",rules:[{required:!0,message:"\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a"},{min:8,type:"string",message:"\u6700\u77ed\u957f\u5ea6\u4e0d\u80fd\u5c11\u4e8e8\u4f4d"},{pattern:/^[A-Za-z0-9]+$/,message:"\u5bc6\u7801\u53ea\u80fd\u5305\u542b\u5b57\u6bcd\u548c\u6570\u5b57"},{whitespace:!0,message:"\u4e0d\u80fd\u4f7f\u7528\u7a7a\u683c"}],children:(0,Z.jsx)(m.Z,{})}),(0,Z.jsx)(n.Z.Item,{className:"items-start",initialValue:I[0],label:"\u533b\u9662",name:"hospital",rules:[{required:!0,message:"\u533b\u9662\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a!"}],children:(0,Z.jsx)(o.Z,{options:I})}),(0,Z.jsx)(n.Z.Item,{className:"items-start",wrapperCol:{offset:4,span:4},children:(0,Z.jsx)(d.ZP,{className:"w-[200px]",type:"primary",htmlType:"submit",children:"\u521b\u5efa"})})]}),(0,Z.jsx)(p.Z,{className:"border-r-0",pagination:!1,columns:s,dataSource:j}),";"]})}}}]);
//# sourceMappingURL=141.affd1d5d.chunk.js.map