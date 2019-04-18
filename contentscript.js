const translatorapikey = "LA5JCioYJfz89Us9pCLGg6i_CBUb5ZmqR1Rq54gSei2w";
const toneanalyzerapikey = "bLF21kTqxCgtS4mYrNeEQETUUtdbGbiuEiu36U0JUwva";

function getAPIKeyV2(apikey){
  return new Promise(function(resolve, reject){
  var xmlRequest = new XMLHttpRequest();
     if(window.XMLHttpRequest){
       xmlRequest.open("POST", "https://iam.bluemix.net/identity/token")
       xmlRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
       xmlRequest.setRequestHeader("Accept", "application/json")

       xmlRequest.send(encodeURI("grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey="+apikey));

       xmlRequest.onreadystatechange = function(){

         if(xmlRequest.readyState ==4 && xmlRequest.status==200) {

             var parsedData = JSON.parse(xmlRequest.responseText)

             resolve (parsedData.access_token);
         }
     }

     }

  });

}

 var callToneAnalyzer = function (word) {
 //var textContent = String(word.selectionText);
 var textContent = document.getElementsByTagName('*');
 var app="hate you"
 var a=0
 for (var i = 0; i < textContent.length; i++) {
     var textContent = textContent[i];
     for (var j = 0; j < textContent.childNodes.length; j++) {
         var node = textContent.childNodes[j];
       
         if (node.nodeType === 3) {
            var text = node.nodeValue;
            //split on dot
            var replacedText = text.replace(new RegExp(app,"gi"), '**** ***');

            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            if(a=0){window.alert("foobar")}
        }
    }
}
}
       

















 var xhr = new XMLHttpRequest();
 var toneanalyzertoken = getAPIKeyV2(toneanalyzerapikey);
 toneanalyzertoken.then(function(result){
 var inputContent = textContent.replace(/%20/g, "");
 xhr.open("GET", "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?sentences=true&version=2016-05-19&text="+inputContent)
 xhr.setRequestHeader("Authorization", "Bearer "+result);
 xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
 xhr.setRequestHeader("Accept", "application/json")

 xhr.send();

 xhr.onreadystatechange = function(){
 if(xhr.readyState == 4 && xhr.status==200){
 var result1 = xhr.responseText;

 var obj = JSON.parse(result1);

 var fulltone  = obj.document_tone.tone_categories;
 var angerTone = obj.document_tone.tone_categories[0].tones[0].tone_name;
 var angerScore = obj.document_tone.tone_categories[0].tones[0].score;

 var disgustTone = obj.document_tone.tone_categories[0].tones[1].tone_name;
 var disgustScore = obj.document_tone.tone_categories[0].tones[1].score;

 var fearTone = obj.document_tone.tone_categories[0].tones[2].tone_name;
 var fearScore = obj.document_tone.tone_categories[0].tones[2].score;

 var joyTone = obj.document_tone.tone_categories[0].tones[3].tone_name;
 var joyScore = obj.document_tone.tone_categories[0].tones[3].score;

 var sadnessTone = obj.document_tone.tone_categories[0].tones[4].tone_name;
 var sadnessScore = obj.document_tone.tone_categories[0].tones[4].score;

  alert(angerTone  + "=  " + angerScore*100 + " %" + ";" + "\n" +  disgustTone + "= "  + disgustScore*100  + " %" + "\n" + fearTone + "= " + fearScore*100 + " %" + "\n" + joyTone + "= " + joyScore*100 + " %" + "\n" + sadnessTone  + "= " + sadnessScore*100 + " %");
  var replacedText = text.replace(new RegExp(textContent,"gi"), '*******');
  

     }
 }
 })

};

// function Translator(word, lang, langname) {
//     var textContent = String(word.selectionText);

//     var accesstoken = getAPIKeyV2(translatorapikey);

//     accesstoken.then(function(result){
//      var inputContent = textContent.replace(/%20/g, " ");
//      var xmlRequest = new XMLHttpRequest();

//      if(window.XMLHttpRequest){

//      xmlRequest.open("POST", "https://gateway-wdc.watsonplatform.net/language-translator/api/v3/translate?version=2018-05-01")
//      xmlRequest.setRequestHeader("Authorization", "Bearer "+ result);
//      xmlRequest.setRequestHeader("Content-type", "application/json");
//      xmlRequest.setRequestHeader("Accept", "application/json");
//      var data = {
//          "text": inputContent,
//          "source": "en",
//          "target": String(lang)
//      }
//      xmlRequest.send(JSON.stringify(data));

//  xmlRequest.onreadystatechange = function() {
//      if(xmlRequest.readyState ==4 && xmlRequest.status==200){
//          var translatedtext = JSON.parse(xmlRequest.responseText);
//          alert("Translated to  " + langname + "\n" + JSON.stringify(translatedtext.translations));
//      }
//  }

//         }    })
// };

// function generalTranslator(word) {

//     var childname = word.menuItemId;

//     if (childname == 'child1') {
//         Translator(word, 'es', 'Spanish');
//         return;
//     }
//     if (childname == 'child2') {
//         Translator(word, 'ar', 'Arabic');
//         return;
//     }
//     if (childname == 'child3') {
//         Translator(word, 'fr', 'French');
//         return;
//     }
//     if (childname == 'child4') {
//         Translator(word, 'pt', 'Portuguese');
//         return;
//     }
//     if (childname == 'child5') {
//         Translator(word, 'de', 'German');
//         return;
//     }
// }

chrome.contextMenus.create({
    title: "IBM Watson API V1",
    id: 'parent',
    contexts: ["selection"],
    onclick: callToneAnalyzer
});

// chrome.contextMenus.create({
//     title: "Translate to Spanish",
//     parentId: "parent",
//     id: "child1",
//     contexts: ["selection"],
//     onclick: generalTranslator
// });

// chrome.contextMenus.create({
//     title: "Translate to Arabic",
//     parentId: "parent",
//     id: "child2",
//     contexts: ["selection"],
//     onclick: generalTranslator
// });

// chrome.contextMenus.create({
//     title: "Translate to French",
//     parentId: "parent",
//     id: 'child3',
//     contexts: ["selection"],
//     onclick: generalTranslator
// });

// chrome.contextMenus.create({
//     title: "Translate to Portuguese",
//     parentId: "parent",
//     id: 'child4',
//     contexts: ["selection"],
//     onclick: generalTranslator
// });

// chrome.contextMenus.create({
//     title: "Translate to German",
//     parentId: "parent",
//     id: 'child5',
//     contexts: ["selection"],
//     onclick: generalTranslator
// });/

// chrome.contextMenus.create({
//     title: "Tone Analyzer",
//     parentId: "parent",
//     id: 'child6',
//     contexts: ["selection"],
//     onclick: callToneAnalyzer