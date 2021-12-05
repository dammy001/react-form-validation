var e=require("react");const a={email:{rule:e=>e&&e.toString().match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i),formatter:e=>e+" is not valid"},required:{rule:e=>e&&void 0!==e&&e.toString().match(/\S/),formatter:e=>e?e+" is required":"This field is required."},numeric:{rule:e=>e&&e.toString().match(/^\d+$/),formatter:e=>e+" should contain only numbers."},alphaNumeric:{rule:e=>e&&e.toString().match(/^[a-z0-9]+$/i),formatter:e=>e+" should not contain special characters, please use only alphabets and numbers."},alphabetic:{rule:e=>e&&e.toString().match(/^[a-z]+$/i),formatter:e=>e+" should contain only alphabets."},maxLength:{rule:(e,a)=>e&&e.toString().length<=a,formatter:(e,a)=>a?`${e} can contain maximum ${a} characters.`:e+" contains more characters than expected."},minLength:{rule:(e,a)=>e&&e.toString().length>=a,formatter:(e,a)=>a?`${e} should contain minimum ${a} characters.`:e+" contains less characters than expected."},phone:{rule:e=>e&&e.toString().match(/^(\+|)(234|0)(7|8|9)(0|1)\d{8}$/),formatter:e=>e+" should contain valid phone number"},url:{rule:e=>e&&e.toString().match(/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/),formatter:e=>e?e+" must be valid url":"This field must be a valid url"},in:{rule:(e,a)=>e&&a.includes(e.toString()),formatter:(e,a)=>`${e} not in any of ${a}`},notIn:{rule:(e,a)=>e&&!a.includes(e.toString()),formatter:(e,a)=>`${e} in any of ${a}`},digitsBetween:{rule:(e,a)=>e&&e.toString().length>=a[0]&&e.toString().length<=a[1],formatter:(e,a)=>`${e} must be a number and between ${a[0]} and ${a[1]}`},regex:{rule:(e,a)=>e&&e.toString().match(a),formatter:e=>e+" does not match the regex provided"},size:{rule:(e,a)=>e&&e.toString().length===a,formatter:(e,a)=>`${e} must be exactly ${a} characters long`},cardNumber:{rule:e=>e&&e.toString().match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|62[0-9]{14})$/),formatter:e=>e+" is not a valid card number"}},t=({key:e,value:t,values:r,checks:l,customValidator:s})=>{if(l){const r=l.split("|");let s="";return r.length&&r.forEach(r=>{const l=r.split(":"),n=l.shift(),o=l.length?l.pop().split(","):[],i=a[n];let u=[],c=[];switch(n){case"maxLength":case"minLength":case"regex":case"size":u=[t,o[0]],c=[e,o[0]];break;case"in":case"notIn":case"digitsBetween":case"creditCard":u=[t,o],c=[e,o];break;default:u=[t],c=[e]}if(n.match(/nullable/)&&(!t||t.constructor===Array&&t.length<1))return!0;"required"!==n&&!t||!!i.rule.apply(null,u)||(s=i.formatter.apply(null,c))}),s}return"function"==typeof s&&s(t,r)},r=(e,a)=>{switch(a.type){case"UPDATE_FIELD":return{...e,errors:{...e.errors,[a.payload.key]:t({key:a.payload.key,value:a.payload.value,values:e.values,checks:e.checks[a.payload.key],customValidator:e.validators[a.payload.key]})},values:{...e.values,[a.payload.key]:a.payload.value}}}};
/* eslint-disable consistent-return */module.exports=a=>{const l={checks:{},values:{},validators:{},errors:{},messages:{}};for(const e in a)l.checks[e]=a[e].checks,l.validators[e]=a[e].validate,l.values[e]=a[e].value,l.errors[e]="";const[s,n]=e.useReducer(r,l),o=({key:e,value:a})=>{if(void 0===s.values[e])throw Error(`Field with key "${e}" not found, please make sure it is define in as follows:\n      useFormValidator({\n        ${e}: {\n          value: "",\n          checks: "required"\n        }\n      })\n      `);n({type:"UPDATE_FIELD",payload:{key:e,value:a}})};return{values:s.values,errors:s.errors,isAllFieldsValid:()=>{let e=!0;for(const a in s.values){t({value:s.values[a],checks:s.checks[a]})&&(e=!1),n({type:"UPDATE_FIELD",payload:{key:a,value:s.values[a],checks:s.checks[a]}})}return e},isFieldValid:e=>(o({key:e,value:s.values[e]}),!s.errors[e]),updateField:e=>{o({key:e.target.name,value:e.target.value})}}};
