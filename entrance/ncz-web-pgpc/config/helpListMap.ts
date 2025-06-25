/**
 *

 //  競品 取得 footer helpe content
    async function getHelp(language) {
      const header = await fetch(`https://www.pgpc.com/wps/system/helpCenter?lang=${language}&device=WEB`, {
        headers: {
          device: 'web',
          language: language,
          merchant: 'wic11f3',
          priority: 'u=1, i',
          'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-gateway-version': '3'
        },
        referrer: 'https://www.pgpc.com/help',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        method: 'GET',
        mode: 'cors',
        credentials: 'omit'
      })
      const res = await header.json()
      console.log(' res ', res.value)
      return res.value
    }
    var res = await getHelp('ZH');
 */

const HD = [
  {
    title: 'हमारे बारे में',
    content:
      '<p>PGPC एशिया की अग्रणी ऑनलाइन जुआ कंपनी है, जो अपने सदस्यों को नवीनतम ऑनलाइन सट्टेबाजी तकनीक प्रदान करने के लिए खेल सट्टेबाजी, लाइव स्पोर्ट्स सट्टेबाजी, लाइव कैसीनो, स्लॉट मशीन गेम, लॉटरी उत्पादों और बहुत कुछ सहित विभिन्न प्रकार के मजेदार और रोमांचक गेमिंग उत्पादों की पेशकश करती है! और सर्वोत्तम गेमिंग अनुभव के लिए, PGPC ने वन वर्क्स, एंटवाइन, माइक्रोगेमिंग, क्राउन कैसीनो, गोल्ड डिलक्स, प्लेटेक, लैक्सिनो, बेट्सॉफ्ट और बोडॉग सहित विभिन्न प्रसिद्ध गेमिंग प्लेटफार्मों के साथ साझेदारी की है। हम औसतन 10,000 विभिन्न खेल गेम और वैश्विक प्रतियोगिताओं की पेशकश करते हैं PGPC की स्पोर्ट्सबुक में हर महीने, और PGPC कैसीनो में कुल 100 से अधिक कैसीनो गेम होते हैं, जिनमें विभिन्न प्रकार के बैकारेट, स्लॉट, रूलेट और अन्य कैसीनो गेम शामिल हैं।</p><p>भारत में एक भरोसेमंद ऑनलाइन जुआ कंपनी</p><p>PGPC मार्च 2021 में स्थापित एक पूरी तरह से पंजीकृत जुआ मनोरंजन कंपनी है। हमारे ब्रांड के पास ई गैम्बलिंग मोंटेनेग्रो डूनबीएसपी द्वारा जारी जुआ लाइसेंस है। उपर्युक्त विश्वसनीय जुआ संस्थानों के प्रमाणीकरण और प्रबंधन के माध्यम से, हम यह सुनिश्चित कर सकते हैं कि सभी सदस्य इसमें शामिल हों और भाग लें PGPC इंटरनेट जुआ नियामक मानकों का अनुपालन करता है, जो हमारे वर्तमान और भविष्य के सदस्यों के लिए एक सुरक्षित और स्थिर गेमिंग मनोरंजन मंच प्रदान करता है।</p><p>PGPC आपके खाते की सुरक्षा और गोपनीयता तथा आपकी जानकारी की गोपनीयता सुनिश्चित करने के लिए दुनिया की शीर्ष नेटवर्क सुरक्षा और ऑडिटिंग प्रणाली, IOVATION के साथ भी सहयोग करती है।</p><p>&nbsp;</p>',
    bgColor: null,
    lang: 'HD',
    display: true,
    tag: 'aboutus',
  },
  {
    title: 'सहायता जमा करें',
    content:
      '<h1>धनराशि तक आसान पहुंच - जब धनराशि जमा करने और निकालने की बात आती है तो आपको PGPC में कभी कोई समस्या नहीं मिलेगी। हमारी भुगतान प्रणाली चिंतामुक्त और अचूक है, जो आपके धन को सुरक्षित रखती है। हम धन के निर्बाध हस्तांतरण को सुनिश्चित करने के लिए नेटबैंकिंग, यूपीआई जैसी कई उन्नत और सुविधाजनक भुगतान विधियों का उपयोग करते हैं। आप PGPC की वेबसाइट पर तुरंत जमा कर सकते हैं और हम आपकी जीत की रकम कुछ ही सेकंड में आपके खाते में जमा कर देंगे। जो लोग भारतीय मुद्रा (आईएनआर) के साथ दांव लगाना चाहते हैं, उनके लिए PGPC निस्संदेह भारत में सर्वश्रेष्ठ ऑनलाइन सट्टेबाजी साइटों में से एक है।</h1>',
    bgColor: null,
    lang: 'HD',
    display: true,
    tag: 'deposit',
    children: [
      {
        title: 'Rupeelink Deposit Tutorial',
        content:
          '<p><img alt="" src="https://images.11029984.com/wsd-images-prod/wic11f3/help_center/wps_rupeelink_user_guide-02_(2)_20241129143815.jpg" /></p>',
        bgColor: null,
        lang: 'HD',
        display: true,
        tag: null,
      },
    ],
  },
  {
    title: 'निकासी सहायता',
    content:
      '<p>PGPC वर्तमान में केवल नेटबैंकिंग और यूपीआई निकासी का समर्थन करता है। प्लेयर सेंटर में, आप अपने मोबाइल फोन नंबर, ईमेल खाते और नेटबैंकिंग और यूपीआई खाते की जानकारी को लिंक कर सकते हैं। सामान्य परिस्थितियों में, निकासी का समय 1 मिनट के भीतर होता है। विशिष्ट संदर्भ बैंक के सिस्टम समय पर आधारित होता है।</p><p>आहरण सीमा<br />एकल लेनदेन के लिए न्यूनतम निकासी राशि ₹100 है, और दिन के लिए अधिकतम निकासी राशि ₹100,000,000 है।</p><p>हार्दिक अनुस्मारक: नकदी निकालने से पहले शर्त राशि को रिचार्ज राशि का 100% पूरा करना होगा।</p><p>निकासी शुल्क<br />PGPC कंपनी मुफ्त नकद निकासी प्रदान करती है</p><p>निकासी विफल रही<br />(1) सदस्य खाते में जमा राशि 100% सट्टेबाजी आवश्यकताओं को पूरा नहीं करती है</p><p>(2) निकासी से जुड़ी खाता जानकारी गलत है</p><p>यदि (1) के कारण निकासी विफल हो जाती है, तो खिलाड़ियों को निकासी कार्रवाई के साथ आगे बढ़ने से पहले निकासी नियमों का पालन करना आवश्यक है;</p><p>यदि (2) के कारण निकासी विफल हो जाती है, तो कृपया निकासी से पहले सही खाता चुनें।</p><p>लॉक की गई निकासीकर्ता जानकारी को कैसे संशोधित करें?<br />ऑनलाइन ग्राहक सेवा से संपर्क करें और सही खाता संख्या, खाता जानकारी, निकासी नाम और अन्य जानकारी प्रदान करें, और ग्राहक सेवा द्वारा सत्यापन के बाद संशोधन पूरा करें।</p>',
    bgColor: null,
    lang: 'HD',
    display: true,
    tag: 'withdraw',
  },
  {
    title: 'खेल परिचय',
    content:
      '<p>बड़े पैमाने पर ऑनलाइन गेम, खेल सट्टेबाजी, PGPC और बड़े पुरस्कार जीतें!<br />यदि आप केवल खेल सट्टेबाजी से परे देख रहे हैं, तो PGPC की ऑनलाइन कैसीनो गेम की श्रृंखला आपके अंदर के जुआरी को प्रेरित करेगी। स्लॉट्स, पोकर, रूलेट, क्रेप्स, पोकर, ब्लैकजैक, बैकारेट और बहुत कुछ में से चुनें। चाहे वह सिंगल स्पिन से लेकर कौशल-आधारित गेम तक हो, साधारण कार्ड गेम से लेकर चमकदार वीडियो ऑनलाइन स्लॉट विकल्प तक, आप भारत में ऑनलाइन कैसीनो में एक बेहतर गेमिंग और ऑनलाइन सट्टेबाजी अनुभव का आनंद ले सकते हैं।</p><p>हम आपके पसंदीदा गेम भी अपने ऑनलाइन कैसीनो में लाए हैं। PGPCका लाइव कैसीनो तीन पत्ती से अंदर बाहर तक कार्ड गेम के साथ-साथ रूलेट, ब्लैकजैक और बैकारेट जैसे कैसीनो गेम पर सट्टेबाजी के विकल्प प्रदान करता है। तो लाइव डीलरों, लाइव खिलाड़ियों और लाइव कैसीनो फ्लोर गतिविधि की चर्चा बस एक क्लिक दूर है। PGPC का ऑनलाइन कैसीनो हमारे प्रसिद्ध अत्याधुनिक गेमिंग साझेदारों जैसे माइक्रोगेमिंग, प्लेटेक, सुपरस्पेड, एज़ुगी, इवोल्यूशन गेमिंग और अन्य द्वारा संचालित है, जो ऑनलाइन सट्टेबाजी प्रक्रिया को आसान और विश्वसनीय बनाता है।</p><p>ऑनलाइन खेल सट्टेबाजी<br />PGPC हजारों लाइव इवेंट पर सट्टेबाजी की पेशकश करता है और स्पोर्ट्सबुक, सबा स्पोर्ट्स, बेटबी2बी और बेटफेयर स्पोर्ट्स एक्सचेंज पर दांव लगाकर वास्तविक पैसा जीतता है। PGPC इंडिया की स्पोर्ट्सबुक ऑनलाइन सट्टेबाजी दुनिया भर में अंतरराष्ट्रीय क्रिकेट को कवर करती है, जिसमें टी20, टेस्ट मैच क्रिकेट और प्रीमियर लीग सहित खेल के सभी प्रारूप शामिल हैं। PGPC स्पोर्ट्सबुक में कई विशेषताएं हैं जो इसे भारत में सर्वश्रेष्ठ ऑनलाइन सट्टेबाजी वेबसाइट बनाती हैं। फुटबॉल अनुयायियों को न्यूकैसल यूनाइटेड, टोटेनहम हॉटस्पर और अन्य जैसे अपने पसंदीदा क्लबों के समर्थन का भी आनंद मिलेगा!</p><p>आभासी खेल सट्टेबाजी<br />PGPC पर ऑनलाइन वर्चुअल स्पोर्ट्स सट्टेबाजी का आनंद लें! सट्टेबाजी साल के किसी भी समय की जा सकती है, भले ही फुटबॉल, बास्केटबॉल या क्रिकेट मैच न हो। जब वर्चुअल स्पोर्ट्स पर ऑनलाइन सट्टेबाजी की बात आती है, तो PGPC से बेहतर कोई सट्टेबाज नहीं है! PGPC में, आप घुड़दौड़, रेसिंग, आइस हॉकी और बहुत कुछ पर ऑनलाइन सट्टेबाजी का आनंद ले सकते हैं!</p><p>ऑनलाइन कैसीनो खेल<br />बिना किसी अतिरिक्त इंस्टॉलेशन की आवश्यकता के PGPC इंडिया में लाइव कैसीनो गेम खेलें। आप पाएंगे कि ऑनलाइन कैसीनो संचालन सुचारू और नेविगेट करने में आसान है, जिससे कैसीनो जुआ एक उपयोगकर्ता के अनुकूल अनुभव बन जाता है। इसके अतिरिक्त, PGPC स्लॉट गेम खोजना आसान है। सर्वश्रेष्ठ कैसीनो सॉफ्टवेयर प्रदाताओं एजुगी, प्लेटेक, इवोल्यूशन गेमिंग और अन्य से ऑनलाइन पोकर, बैकारेट और रम्मी खेलें।</p><p>ऑनलाइन स्लॉट खेल<br />हमारी शीर्ष स्लॉट मशीनों के साथ लास वेगास का अनुभव प्राप्त करें। PGPC विभिन्न थीम और उच्च गुणवत्ता वाले ग्राफिक्स के साथ हजारों स्लॉट गेम पेश करता है। PGPC के चार स्लॉट गेम प्रदाता हैं: नेटेंट, माइक्रोगेमिंग, प्लेटेक और प्रैग्मैटिक प्ले। आपको 3डी स्लॉट, उच्च और निम्न सीमा वाले गेम जैसे पेनी स्लॉट और वास्तविक धन साइटों के अनुभाग भी मिलेंगे।</p><p>ऑनलाइन कार्ड गेम<br />क्या आप लोकप्रिय भारतीय कार्ड गेम, इंडियन पोकर, अंदर बाहर और तीन पत्ती खेलना पसंद करते हैं? इस मामले में, आप लाइव कैसीनो पेज पर सुपरस्पेड, एज़ुगी और महान गेम प्रदाताओं में से चुन सकते हैं। PGPC भारत में सर्वश्रेष्ठ पोकर साइट बन गई है क्योंकि हमारे निरंतर प्रौद्योगिकी अपडेट, गेम सुरक्षा के लिए ऑटो-शफल स्विच और गेम अखंडता पर हमारा ध्यान केंद्रित है। PGPC अब तक की एकमात्र अग्रणी ऑनलाइन गेमिंग और सट्टेबाजी साइट है!</p><p>&nbsp;</p>',
    bgColor: null,
    lang: 'HD',
    display: true,
    tag: 'game',
  },
  {
    title: 'आम समस्या',
    content:
      '<p>भारतीय ऑनलाइन सट्टेबाजी साइटों के लिए अक्सर पूछे जाने वाले प्रश्न (एफएक्यू)।<br />PGGO इंडिया पर ऑनलाइन दांव कैसे लगाएं?<br />क्या PGGO पर भारतीय रुपयों में ऑनलाइन दांव लगाना संभव है?<br />क्या भारत में ऑनलाइन सट्टेबाजी साइटें सुरक्षित हैं?<br />भारत में ऑनलाइन सट्टा लगाने के और कौन से तरीके हैं?<br />आपको ऑनलाइन दांव लगाने की क्या आवश्यकता है?<br />भारत में ऑनलाइन सट्टेबाजी के लिए भुगतान के तरीके क्या हैं?<br />PGGO से PGGO सट्टेबाजी बोनस का दावा कैसे करें?<br />सबसे कम ऑनलाइन सट्टेबाजी की संभावनाएँ क्या हैं?<br />भारतीय रुपए में न्यूनतम जमा और निकासी राशि क्या है?</p><p>&nbsp;</p>',
    bgColor: null,
    lang: 'HD',
    display: true,
    tag: 'faqs',
    children: [
      {
        title: 'PGPC ऑनलाइन दांव कैसे लगाएं?',
        content:
          '<p>PGPC पर ऑनलाइन सट्टेबाजी आसान है। बस हमारी वेबसाइट पर रजिस्टर करें या हमारा ऐप डाउनलोड करें। आप PGPCकी वेबसाइट पर सट्टेबाजी के लिए क्रिकेट, टेनिस, फुटबॉल, बेसबॉल, वॉलीबॉल, कबड्डी और कई अन्य खेलों की एक विस्तृत श्रृंखला पा सकते हैं। आप ऐसी कई प्रतियोगिताएं पा सकते हैं जो वर्तमान में चल रही हैं या निकट भविष्य में कुछ समय के लिए निर्धारित हैं। उपयुक्त सट्टेबाजी विकल्प/बाज़ार का चयन करें जिस पर आप दांव लगाना चाहते हैं और आप PGPC पर दांव लगाना शुरू कर देंगे, जो भारत में शीर्ष सट्टेबाजी साइटों में से एक है।</p>',
        bgColor: null,
        lang: 'HD',
        display: true,
        tag: null,
      },
      {
        title: 'PGPC क्या मैं भारतीय रुपयों से ऑनलाइन दांव लगा सकता हूँ?',
        content:
          '<p>PGPCभारत में सर्वश्रेष्ठ ऑनलाइन सट्टेबाजी साइटों में से एक है जो आपको भारतीय रुपयों में दांव लगाने की अनुमति देती है। इसलिए, भारतीय सट्टेबाजों को अपना दांव लगाने के लिए स्थानीय मुद्रा का आदान-प्रदान करने की आवश्यकता नहीं है। बस PGPC के पोर्टल पर जाएं और भारतीय रुपयों में ऑनलाइन सट्टेबाजी शुरू करें।</p>',
        bgColor: null,
        lang: 'HD',
        display: true,
        tag: null,
      },
      {
        title: 'क्या भारत में ऑनलाइन सट्टेबाजी साइटें सुरक्षित हैं?',
        content:
          '<p>हां, PGPC भारत में सबसे सुरक्षित ऑनलाइन सट्टेबाजी वेबसाइट है। केवल उन अनुमोदित ऑनलाइन सट्टेबाजी साइटों का उपयोग करना बुद्धिमानी है जो लाइसेंस प्राप्त और स्वतंत्र रूप से विनियमित हैं</p>',
        bgColor: null,
        lang: 'HD',
        display: true,
        tag: null,
      },
      {
        title: 'भारत में ऑनलाइन सट्टा लगाने के और कौन से तरीके हैं?',
        content: '<p>आप PGPC के ऑनलाइन कैसीनो में दांव भी लगा सकते हैं और स्लॉट, ब्लैकजैक और रूलेट जैसे गेम भी खेल सकते हैं।</p>',
        bgColor: null,
        lang: 'HD',
        display: true,
        tag: null,
      },
      {
        title: 'आपको ऑनलाइन दांव लगाने की क्या आवश्यकता है?',
        content:
          '<p>जब आपको पंजीकरण करने की आवश्यकता होती है तो भारत में ऑनलाइन सट्टेबाजी साइटों को आपसे निम्नलिखित प्रमाण की आवश्यकता होती है।</p><p>- वैध पता, ईमेल पता और मोबाइल फोन नंबर</p><p>- आपके खाते से धनराशि जमा करने और निकालने के लिए कानूनी भुगतान विधियाँ</p>',
        bgColor: null,
        lang: 'HD',
        display: true,
        tag: null,
      },
      {
        title: 'भारत में ऑनलाइन सट्टेबाजी के लिए भुगतान के तरीके क्या हैं?',
        content: '<p>निम्नलिखित भुगतान विधियाँ उपलब्ध हैं:</p><p>- यूपीआई ऐप</p><p><br />नेटबैंकिंग</p>',
        bgColor: null,
        lang: 'HD',
        display: true,
        tag: null,
      },
      {
        title: 'PGPCसे PGPC सट्टेबाजी बोनस का दावा कैसे करें?',
        content:
          '<p>1. तुरंत अपने PGPC बोनस का दावा करने के लिए बटन पर क्लिक करें।</p><p>2. नया PGPC खाता बनाने के लिए अपना विवरण दर्ज करें।</p><p>3. हमारी किसी भी भुगतान विधि का उपयोग करके PGPC जमा करें।</p><p>4. माई प्रमोशन पेज पर जाएं और स्वागत बोनस सक्रिय करें।<br />5. निमंत्रण बोनस पाने के लिए दोस्तों को आमंत्रित करें</p>',
        bgColor: null,
        lang: 'HD',
        display: true,
        tag: null,
      },
      {
        title: 'सबसे कम ऑनलाइन सट्टेबाजी की संभावनाएँ क्या हैं?',
        content:
          '<p>सट्टेबाजी साइटें अक्सर व्यवहार्य दांवों के लिए न्यूनतम ऑड्स निर्धारित करती हैं, उदाहरण के लिए न्यूनतम ऑड्स (2.00) पर तय किया जा सकता है, जिसके लिए आपको अर्हता प्राप्त करने के लिए अपना विजयी दांव 2.00 या उससे अधिक पर सेट करना होगा।</p>',
        bgColor: null,
        lang: 'HD',
        display: true,
        tag: null,
      },
      {
        title: 'भारतीय रुपये में न्यूनतम जमा और निकासी राशि क्या है?',
        content:
          '<p>भारतीय रुपये का उपयोग करने वाली ऑनलाइन सट्टेबाजी साइटों में अलग-अलग न्यूनतम जमा और निकासी राशि होती है। कुछ सट्टेबाज न्यूनतम जमा राशि ₹10 तक की पेशकश करते हैं, जबकि न्यूनतम और अधिकतम निकासी राशि बाजार के साथ-साथ चुनी गई भुगतान विधि पर निर्भर करती है।</p>',
        bgColor: null,
        lang: 'HD',
        display: true,
        tag: null,
      },
    ],
  },
]

const EN = [
  {
    title: 'About US',
    content:
      '<pre aria-label="Translated text" data-placeholder="Translation" data-ved="2ahUKEwiS24_Y1JuGAxXsSWwGHc3SA0gQ3ewLegQIDxAU" dir="ltr" id="tw-target-text">PGPC is Asia&#39;s leading online gambling company, offering a variety of fun and exciting gaming products, including sports betting,live sports betting, live casino, slot machine games, lottery products and more! In order to provide our members with the latest onlinebetting technology and the best gaming experience, PGPC partners with various well-known gaming platforms, including One Works, EntwineMicrogaming, Crown Casino, Gold Deluxe, PlayTech, Laxino, Betsoft and Bodog. We offer an average of 10,000 different sports games andglobal competitions every month in PGPC&#39;s sportsbook, and the PGPC Casino has a total of over 100 casino games, including a variety ofbaccarat, slots, roulette and other casino games.A Trustworthy Online Gambling Company in IndiaPGPC is a fully registered gambling entertainment company established in March 2021. Our brand holds a gambling license issued by E Gambling Montenegro doonbsp. Through the certification and management of the above-mentioned trusted gambling institutions, we can ensure that all members who join and participate in PGPC comply with Internet gambling regulatory standards, providing a safe and stable gaming fun platform for our current and future members.PGPC also cooperates with IOVATION, the world&#39;s top network security and auditing system, to ensure the security and privacy of youraccount and the confidentiality of your information.</pre>',
    bgColor: null,
    lang: 'EN',
    display: true,
    tag: 'aboutus',
  },
  {
    title: 'Deposit',
    content:
      '<pre aria-label="Translated text" data-placeholder="Translation" data-ved="2ahUKEwiS24_Y1JuGAxXsSWwGHc3SA0gQ3ewLegQIDxAU" dir="ltr" id="tw-target-text">Easy access to funds &ndash; You will never find any issues at PGPC when it comes to depositing and withdrawing funds.Our payment system is worry-free and foolproof, keeping your funds safe. We use multiple advanced and convenient payment methodslike Netbanking, UPI to ensure seamless transfer of funds. You can deposit instantly on PGPC&#39;s website and we&#39;ll have your winnings credited to your account within seconds. For those who want to bet with Indian Currency (INR), PGPC is undoubtedly one of the best online betting sites in India.</pre>',
    bgColor: null,
    lang: 'EN',
    display: true,
    tag: 'deposit',
    children: [
      {
        title: 'Rupeelink Deposit Tutorial',
        content: '',
        // '<p><img alt="" src="https://images.11029984.com/wsd-images-prod/wic11f3/help_center/wps_rupeelink_user_guide-02_(2)_20241129143815.jpg" /></p>',
        bgColor: null,
        lang: 'EN',
        display: true,
        tag: null,
      },
    ],
  },
  {
    title: 'Withdrawal',
    content:
      '<pre aria-label="Translated text" data-placeholder="Translation" data-ved="2ahUKEwiS24_Y1JuGAxXsSWwGHc3SA0gQ3ewLegQIDxAU" dir="ltr" id="tw-target-text">PGPC currently only supports Netbanking and UPI withdrawals. In the player center, you can bind your mobile phone number, email account, and Netbanking and UPI account information. Under normal circumstances, the withdrawal time is within 1 minute. The specific reference is based on the bank&#39;s system time.Withdrawal limitThe minimum withdrawal amount for a single transaction is ₹100, and the maximum withdrawal amount for the day is ₹100,000,000.Warm reminder: The bet amount must meet 100% of the recharge amount before cash can be withdrawn.Withdrawal feePGPC company provides free cash withdrawalsWithdrawal failed(1) The deposit amount in the member account does not meet 100% of the betting requirements(2) The account information bound to the withdrawal is incorrectIf the withdrawal fails due to (1), players are required to abide by the withdrawal regulations before proceeding with the withdrawal operation;If the withdrawal fails due to (2), please choose the correct account before withdrawing.How to modify the locked withdrawer information?Contact online customer service and provide the correct account number, account information, withdrawal name and other information, and complete the modification after verification by customer service.</pre>',
    bgColor: null,
    lang: 'EN',
    display: true,
    tag: 'withdraw',
  },
  {
    title: 'game introduction',
    content:
      '<pre aria-label="Translated text" data-placeholder="Translation" data-ved="2ahUKEwiS24_Y1JuGAxXsSWwGHc3SA0gQ3ewLegQIDxAU" dir="ltr" id="tw-target-text">Massive online games, sports betting, PGPC and win big prizes!If you’re looking beyond just sports betting, PGPC’s range of online casino games will inspire the gambler in you. Choose from slots,poker, roulette, craps, poker, blackjack, baccarat and more. Be it single spins to skill-based games, from simple card games to dazzlingvideo online slots options, you can enjoy a superior gaming and online betting experience at online casinos in India.We\'ve also brought your favorite games to our online casino. PGPC’s live casino offers betting options on card games from Teen Patti to Andar Bahar as well as casino games such as Roulette, Blackjack and Baccarat. So the buzz of live dealers, live players andlive casino floor activity is just a click away. PGPC’s online casino is powered by our renowned cutting-edge gaming partners such asMicrogaming, Playtech, Superspade, Ezugi, Evolution Gaming and more, making the online betting process easy and reliable.</pre><pre aria-label="Translated text" data-placeholder="Translation" data-ved="2ahUKEwiS24_Y1JuGAxXsSWwGHc3SA0gQ3ewLegQIDxAU" dir="ltr" id="tw-target-text">Online sports bettingPGPC offers betting on thousands of live events and win real money by betting on Sportsbook, Saba Sports, BetB2B and Betfair SportsExchange. PGPC India\'s sportsbook online betting covers international cricket across the globe, including all formats of the gameincluding T20, Test Match Cricket and Premier League. PGPC Sportsbook has numerous features that make it the best online betting website in India. Football followers will also enjoy support for their favorite clubs like Newcastle United, Tottenham Hotspur and more!</pre><pre aria-label="Translated text" data-placeholder="Translation" data-ved="2ahUKEwiS24_Y1JuGAxXsSWwGHc3SA0gQ3ewLegQIDxAU" dir="ltr" id="tw-target-text">Virtual Sports BettingEnjoy online virtual sports betting at PGPC! Betting can be done at any time of the year, even if there is no football, basketball or cricket match. When it comes to betting on virtual sports online, there is no better bookmaker than PGPC! At PGPC, you can enjoy online betting on horse racing, racing, ice hockey, and more!</pre><pre aria-label="Translated text" data-placeholder="Translation" data-ved="2ahUKEwiS24_Y1JuGAxXsSWwGHc3SA0gQ3ewLegQIDxAU" dir="ltr" id="tw-target-text">online casino gamesPlay live casino games at PGPC India with no additional installation required. You will find that online casino operations are smoothand easy to navigate, making casino gambling a user-friendly experience. Additionally, PGPC slot games are easy to discover. Play poker, baccarat and rummy online from the best casino software providers Ezugi, Playtech, Evolution Gaming and more</pre><pre aria-label="Translated text" data-placeholder="Translation" data-ved="2ahUKEwiS24_Y1JuGAxXsSWwGHc3SA0gQ3ewLegQIDxAU" dir="ltr" id="tw-target-text">Online slot gamesGet the Las Vegas experience with our top slot machines. PGPC offers thousands of slot games with different themes and high-qualitygraphics. PGPC has four slot game providers: Netent, Microgaming, Playtech and Pragmatic play. You\'ll also find sections for 3D slots, high and low limit games such as penny slots, and real money sites.</pre><pre aria-label="Translated text" data-placeholder="Translation" data-ved="2ahUKEwiS24_Y1JuGAxXsSWwGHc3SA0gQ3ewLegQIDxAU" dir="ltr" id="tw-target-text">Online card gamesDo you love playing popular Indian card games, Indian Poker, Andar Bahar and Teen Patti? In this case, you can choose from Superspade,Ezugi and great game providers on the live casino page. PGPC has become the best poker site in India as our constant technology updates, auto-shuffle switch for game security and game integrity remain our focus. PGPC is the only leading online gaming and betting site ever!</pre><pre data-placeholder="" dir="ltr" id="tw-target-rmn">&nbsp;</pre><p><img alt="wps_content_0_20240520172901.png" data-atf="0" data-csiid="10" height="16" id="dimg_3" src="https://images.11029984.com/wsd-images-prod/wic11f3/help_center/wps_content_0_20240520172901.png" width="16"></p>',
    bgColor: null,
    lang: 'EN',
    display: true,
    tag: 'game',
  },
  {
    title: 'FAQs',
    content:
      '<pre aria-label="Translated text" data-placeholder="Translation" data-ved="2ahUKEwiS24_Y1JuGAxXsSWwGHc3SA0gQ3ewLegQIDxAU" dir="ltr" id="tw-target-text">Frequently Asked Questions (FAQ) for Indian Online Betting SitesHow to place bets online at PGPC India?Is it possible to place bets online in Indian Rupees at PGPC?Are online betting sites in India safe?What other ways to bet online in India?What do you need to bet online?What are the payment methods for online betting in India?How to claim PGPC betting bonus from PGPC?What are the lowest online betting odds?What is the minimum deposit and withdrawal amount in Indian Rupees?</pre><pre aria-label="Translated text" data-placeholder="Translation" data-ved="2ahUKEwiS24_Y1JuGAxXsSWwGHc3SA0gQ3ewLegQIDxAU" dir="ltr" id="tw-target-text">&nbsp;</pre>',
    bgColor: null,
    lang: 'EN',
    display: true,
    tag: 'faqs',
    children: [
      {
        title: 'How to place bets online at PGPC ?',
        content:
          '<p>Betting online with PGPC is easy. Just register on our website or download our app. You can find a wide range of sports available for betting on PGPC&rsquo;s website including cricket, tennis, football, baseball, volleyball, kabaddi and many more. You can find many contests that are currently underway or scheduled for some time in the near future. Select the appropriate betting option/market you want to bet on and you will start betting at PGPC, one of the top betting sites in India</p>',
        bgColor: null,
        lang: 'EN',
        display: true,
        tag: null,
      },
      {
        title: 'PGPC Can I place bets online with Indian rupees?',
        content:
          '<p>PGPC is one of the best online betting sites in India that allows you to bet in Indian Rupees. Therefore, Indian bettors do not need to exchange local currency to place their bets. Just visit PGPC&rsquo;s portal and start betting online in Indian Rupees.</p>',
        bgColor: null,
        lang: 'EN',
        display: true,
        tag: null,
      },
      {
        title: 'Are online betting sites in India safe?',
        content:
          '<p>Yes, PGPC is the safest online betting website in India. It is wise to only use approved online betting sites that are licensed and independently regulated</p>',
        bgColor: null,
        lang: 'EN',
        display: true,
        tag: null,
      },
      {
        title: 'What other ways to bet online in India?',
        content:
          '<p>You can also place bets and play games like slots, blackjack, and roulette at PGPC&rsquo;s online casino.</p>',
        bgColor: null,
        lang: 'EN',
        display: true,
        tag: null,
      },
      {
        title: 'What do you need to bet online?',
        content:
          '<p>Online betting sites in India require the following proof from you when you need to register.</p><p>- Valid address, email address and mobile phone number</p><p>- Legal payment methods to deposit and withdraw funds from your account</p>',
        bgColor: null,
        lang: 'EN',
        display: true,
        tag: null,
      },
      {
        title: 'What are the payment methods for online betting in India?',
        content: '<p>The following payment methods are available:</p><p>- UPI App</p><p>-Netbanking</p>',
        bgColor: null,
        lang: 'EN',
        display: true,
        tag: null,
      },
      {
        title: 'How to claim PGPC betting bonus from PGPC?',
        content:
          '<p>How to claim PGPC betting bonus from PGPC?<br />1. Click the button to claim your PGPC bonus immediately.<br />2. Enter your details to create a new PGPC account.</p><p>3. Deposit PGPC using any of our payment methods.</p><p>4. Go to the My Promotions page and activate the welcome bonus.<br />5. Invite friends to get invitation bonuses<br />&nbsp;</p>',
        bgColor: null,
        lang: 'EN',
        display: true,
        tag: null,
      },
      {
        title: 'What are the lowest online betting odds?',
        content:
          '<p>Betting sites will often set minimum odds for viable bets, for example the minimum odds may be fixed at (2.00) which will require you to set your winning bet at 2.00 or higher to qualify.<br />&nbsp;</p>',
        bgColor: null,
        lang: 'EN',
        display: true,
        tag: null,
      },
      {
        title: 'What is the minimum deposit and withdrawal amount in Indian Rupees?',
        content:
          '<p>Online betting sites using Indian rupees have different minimum deposit and withdrawal amounts. Some bookmakers offer minimum deposits as low as ?10, while the minimum and maximum withdrawal amounts depend on the market as well as the chosen payment method.</p>',
        bgColor: null,
        lang: 'EN',
        display: true,
        tag: null,
      },
    ],
  },
]

const ZH = [
  {
    title: '关于我们',
    content:
      '<p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span>&nbsp;<span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">是亚洲领先的在线赌博公司，提供各种有趣且令人兴奋的游戏产品，包括体育博彩、滚球体育博彩、真人娱乐场、老虎机游戏、彩票产品等！为了给我们的会员提供最新的在线投注技术和最佳的游戏体验，</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">与各种著名的游戏平台合作，包括</font><font face="Calibri">One Works</font><font face="SimSun">、</font><font face="Calibri">Entwine</font><font face="SimSun">、</font><font face="Calibri">Microgaming</font><font face="SimSun">、</font><font face="Calibri">Crown Casino</font><font face="SimSun">、</font><font face="Calibri">Gold Deluxe</font><font face="SimSun">、</font><font face="Calibri">PlayTech</font><font face="SimSun">、</font><font face="Calibri">Laxino</font><font face="SimSun">、</font><font face="Calibri">Betsoft</font><font face="SimSun">和</font><font face="Calibri">Bodog</font><font face="SimSun">。我们在 </font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="SimSun">的体育博彩中平均每月提供</font> <font face="Calibri">10,000 </font><font face="SimSun">种不同的体育游戏和全球比赛，而 </font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="SimSun">赌场总共有</font> <font face="Calibri">100 </font><font face="SimSun">多种赌场游戏，包括各种百家乐、老虎机、轮盘赌和其他赌场游戏。</font></span></span></span></span></p><p style="text-align:justify">&nbsp;</p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">印度一家值得信赖的在线赌博公司</font></span></span></span></span></p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span>&nbsp;<span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">是一家完全注册的赌博娱乐公司，成立于</font> <font face="Calibri">20</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">21</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="SimSun">年</font> </span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">3</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="SimSun">月。我们的品牌持有</font> <font face="Calibri">E Gambling Montenegro doonbsp </font><font face="SimSun">颁发的赌博许可证。通过上述可信赌博机构的认证和管理，可确保所有加入 </font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="SimSun">并参与其中的会员均符合互联网赌博监管标准，为我们当前和未来会员提供安全稳定的游戏乐趣平台。</font></span></span></span></span></p><p style="text-align:justify">&nbsp;</p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">还与全球顶尖的网络安全和审计系统</font><font face="Calibri">IOVATION</font><font face="SimSun">合作，确保您的账户安全隐私和信息保密。</font></span></span></span></span></p>',
    bgColor: null,
    lang: 'CN',
    display: true,
    tag: 'aboutus',
  },
  {
    title: '存款帮助',
    content:
      '<p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">轻松存取资金</font> <font face="SimSun">&ndash;当涉及存取资金时，您在 </font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="SimSun">永远不会发现任何问题。我们的支付系统无忧且万无一失，确保您的资金安全。我们使用多种先进且便捷的支付方式，如</font> <font face="Calibri">Netbanking</font><font face="SimSun">、</font><font face="Calibri">UPI</font><font face="SimSun">，以确保资金的无缝转移。您可以立即在 </font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="SimSun">的网站上存款，我们会在几秒钟内将奖金存入您的帐户。对于那些想用印度货币</font> <font face="Calibri">(INR) </font><font face="SimSun">进行投注的人来说，</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="SimSun">无疑是印度最好的在线投注网站之一。</font></span></span></span></span></p>',
    bgColor: null,
    lang: 'CN',
    display: true,
    tag: 'deposit',
    children: [
      {
        title: 'Rupeelink Deposit Tutorial',
        content:
          '<p><img alt="" src="https://images.11029984.com/wsd-images-prod/wic11f3/help_center/wps_rupeelink_user_guide-02_(2)_20241129143815.jpg" /></p>',
        bgColor: null,
        lang: 'CN',
        display: true,
        tag: null,
      },
    ],
  },
  {
    title: '取款帮助',
    content:
      '<p class="p" style="text-align:left; margin-top:7px; margin-bottom:7px"><span style="font-size:12pt"><span style="font-family:Calibri"><span style="font-size:12.0000pt"><span style="font-family:Calibri">PGPC<font face="SimSun">公司目前仅支持</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">Netbanking</font><font face="SimSun">、</font><font face="Calibri">UPI</font></span></span><span style="font-size:12.0000pt"><span style="font-family:Calibri"><font face="SimSun">提款，在玩家中心您可以绑定您的手机号码，邮箱账户，</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">Netbanking</font><font face="SimSun">、</font><font face="Calibri">UPI</font></span></span><span style="font-size:12.0000pt"><span style="font-family:Calibri"><font face="SimSun">的账户资料。正常情况下，提款到账时间在</font>1<font face="SimSun">分钟内，具体参照以银行的系统时间为准。</font></span></span></span></span></p><p class="p" style="text-align:left; margin-top:7px; margin-bottom:7px"><span style="font-size:12pt"><span style="font-family:Calibri"><span style="font-size:12.0000pt"><span style="font-family:Calibri"><font face="SimSun">提现限额</font></span></span><br /><span style="font-size:12.0000pt"><span style="font-family:Calibri"><font face="SimSun">单次最低提现额度为</font></span></span><span style="font-size:12.0000pt"><span style="font-family:Calibri"><font face="Calibri">₹</font></span></span><span style="font-size:12.0000pt"><span style="font-family:Calibri">1</span></span><span style="font-size:12.0000pt"><span style="font-family:SimSun"><font face="Calibri">00</font></span></span><span style="font-size:12.0000pt"><span style="font-family:Calibri"><font face="SimSun">，当日最高提款为</font></span></span><span style="font-size:12.0000pt"><span style="font-family:Calibri"><font face="Calibri">₹</font></span></span><span style="font-size:12.0000pt"><span style="font-family:Calibri">100</span></span><span style="font-size:12.0000pt"><span style="font-family:SimSun"><font face="Calibri">00</font></span></span><span style="font-size:12.0000pt"><span style="font-family:Calibri">0000<font face="SimSun">。</font></span></span></span></span></p><p class="p" style="text-align:left; margin-top:7px; margin-bottom:7px"><span style="font-size:12pt"><span style="font-family:Calibri"><span style="font-size:12.0000pt"><span style="font-family:Calibri"><font face="SimSun">温馨提示：投注额需满足充值金额的</font>100%<font face="SimSun">，即可提现。</font></span></span></span></span></p><p class="p" style="text-align:left; margin-top:7px; margin-bottom:7px"><span style="font-size:12pt"><span style="font-family:Calibri"><span style="font-size:12.0000pt"><span style="font-family:Calibri"><font face="SimSun">提现手续费</font></span></span><br /><span style="font-size:12.0000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:12.0000pt"><span style="font-family:Calibri"><font face="SimSun">公司</font>&nbsp;<font face="SimSun">提供免费提现</font></span></span></span></span></p><p class="p" style="text-align:left; margin-top:7px; margin-bottom:7px"><span style="font-size:12pt"><span style="font-family:Calibri"><span style="font-size:12.0000pt"><span style="font-family:Calibri"><font face="SimSun">未能成功提现</font></span></span><br /><span style="font-size:12.0000pt"><span style="font-family:Calibri"><font face="SimSun">（</font>1<font face="SimSun">）会员账户的存款额未满足</font><font face="Calibri">100%</font><font face="SimSun">投注要求</font></span></span></span></span></p><p class="p" style="text-align:left; margin-top:7px; margin-bottom:7px"><span style="font-size:12pt"><span style="font-family:Calibri"><span style="font-size:12.0000pt"><span style="font-family:Calibri"><font face="SimSun">（</font>2<font face="SimSun">）提现绑定的账户信息有误</font></span></span></span></span></p><p class="p" style="text-align:left; margin-top:7px; margin-bottom:7px"><span style="font-size:12pt"><span style="font-family:Calibri"><span style="font-size:12.0000pt"><span style="font-family:Calibri"><font face="SimSun">由（</font>1<font face="SimSun">）引起的提现失败，请玩家自行遵守 提现规定后再进行提现操作；</font></span></span></span></span></p><p class="p" style="text-align:left; margin-top:7px; margin-bottom:7px"><span style="font-size:12pt"><span style="font-family:Calibri"><span style="font-size:12.0000pt"><span style="font-family:Calibri"><font face="SimSun">由（</font>2<font face="SimSun">）引起的提现失败，请玩家选择匹配正确的账户后再进行提现操作。</font></span></span></span></span></p><p class="p" style="text-align:left; margin-top:7px; margin-bottom:7px"><span style="font-size:12pt"><span style="font-family:Calibri"><span style="font-size:12.0000pt"><span style="font-family:Calibri"><font face="SimSun">如何修改已经锁定的取款人信息？</font></span></span><br /><span style="font-size:12.0000pt"><span style="font-family:Calibri"><font face="SimSun">联系在线客服并提供正确的</font> <font face="SimSun">账号、账户信息、取款人姓名等信息，经客服核实无误后完成修改。</font></span></span></span></span></p>',
    bgColor: null,
    lang: 'CN',
    display: true,
    tag: 'withdraw',
  },
  {
    title: '游戏介绍',
    content:
      '<p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">海量在线游戏、体育投注</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">赢大奖！</font></span></span></span></span></p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">如果您的目光不仅仅限于体育博彩，</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="SimSun">的在线赌场游戏系列将激发您的赌徒气质。从老虎机、扑克、轮盘赌、掷骰子、纸牌、二十一点、百家乐等中进行选择。无论是单次旋转到基于技能的游戏，从简单的纸牌游戏到令人眼花缭乱的视频在线老虎机选项，您都可以在印度的在线赌场享受卓越的游戏和在线投注体验。</font></span></span></span></span></p><p style="text-align:justify">&nbsp;</p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">我们还将您最喜欢的游戏带到了我们的在线赌场。</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="SimSun">的真人赌场提供</font><font face="Calibri">Teen Patti</font><font face="SimSun">到</font><font face="Calibri">Andar Bahar</font><font face="SimSun">等纸牌游戏以及轮盘赌、二十一点和百家乐等赌场游戏的投注选项。因此，只需点击一下鼠标，即可了解真人荷官、真人玩家和真人赌场场内活动的嗡嗡声。我们知名的尖端游戏合作伙伴（如 </font><font face="Calibri">Microgaming</font><font face="SimSun">、</font><font face="Calibri">Playtech</font><font face="SimSun">、</font><font face="Calibri">Superspade</font><font face="SimSun">、</font><font face="Calibri">Ezugi</font><font face="SimSun">、</font><font face="Calibri">Evolution Gaming </font><font face="SimSun">等）为</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="SimSun">的在线赌场提供支持，让在线投注过程变得轻松可靠。</font></span></span></span></span></p><p style="text-align:justify">&nbsp;</p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">在线体育博彩</font></span></span></span></span></p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span>&nbsp;<span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">提供数以千计的现场赛事投注，并通过体育博彩、</font> <font face="Calibri">Saba Sports</font><font face="SimSun">、 </font><font face="Calibri">BetB2B</font><font face="SimSun">和</font><font face="Calibri">Betfair Sports Exchange </font><font face="SimSun">投注赢取真钱。 </font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="Calibri">India </font><font face="SimSun">的体育博彩在线投注涵盖全球国际板球运动，包括 </font><font face="Calibri">T20</font><font face="SimSun">、板球测试赛和超级联赛等所有比赛形式。 </font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="Calibri">Sportsbook </font><font face="SimSun">拥有众多功能，使其成为印度最好的在线投注网站。足球追随者还将享受对纽卡斯尔联队、托特纳姆热刺队等他们最喜欢的俱乐部的支持！</font></span></span></span></span></p><p style="text-align:justify">&nbsp;</p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">虚拟体育博彩</font></span></span></span></span></p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">在</font> </span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="SimSun">享受在线虚拟体育博彩！一年中的任何时间都可以投注，即使没有足球、篮球或板球比赛。当谈到虚拟体育在线投注时，没有比</font> </span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="SimSun">更好的博彩公司了！在</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">，您可以享受赛马、赛车、冰球等在线投注！</font></span></span></span></span></p><p style="text-align:justify">&nbsp;</p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">在线赌场游戏</font></span></span></span></span></p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">在</font> </span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="Calibri">India </font><font face="SimSun">玩真人赌场游戏，无需额外安装。您会发现在线赌场操作流畅且易于导航，使赌场赌博成为一种用户友好的体验。此外，</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="SimSun">老虎机游戏很容易发现。在线玩扑克、百家乐和拉米纸牌游戏，由最好的赌场软件提供商</font> <font face="Calibri">Ezugi</font><font face="SimSun">、</font><font face="Calibri">Playtech</font><font face="SimSun">、 </font><font face="Calibri">Evolution Gaming</font><font face="SimSun">等</font></span></span></span></span></p><p style="text-align:justify">&nbsp;</p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">在线老虎机游戏</font></span></span></span></span></p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">通过我们的顶级老虎机获得拉斯维加斯体验。</font> </span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="SimSun">提供数千种不同主题和高品质图形的老虎机游戏。</font> </span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="SimSun">的老虎机游戏有四家老虎机游戏提供商：</font> <font face="Calibri">Netent</font><font face="SimSun">、 </font><font face="Calibri">Microgaming</font><font face="SimSun">、 </font><font face="Calibri">Playtech</font><font face="SimSun">和 </font><font face="Calibri">Pragmatic play</font><font face="SimSun">。您还可以找到 </font><font face="Calibri">3D </font><font face="SimSun">老虎机、高限额和低限额游戏（例如便士老虎机）以及真钱网站的部分。</font></span></span></span></span></p><p style="text-align:justify">&nbsp;</p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">在线纸牌游戏</font></span></span></span></span></p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">您喜欢玩流行的印度纸牌游戏、印度扑克、</font><font face="Calibri">Andar Bahar </font><font face="SimSun">和 </font><font face="Calibri">Teen Patti </font><font face="SimSun">吗？在这种情况下，您可以在真人娱乐场页面上从</font><font face="Calibri">Superspade</font><font face="SimSun">、</font><font face="Calibri">Ezugi</font><font face="SimSun">和出色的游戏提供商中进行选择。 </font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="SimSun">已成为印度最好的扑克网站，因为我们不断的技术更新、用于游戏安全的自动洗牌开关以及游戏完整性仍然是我们的重点。</font> </span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="SimSun">是有史以来唯一领先的在线游戏和投注网站！</font></span></span></span></span></p>',
    bgColor: null,
    lang: 'CN',
    display: true,
    tag: 'game',
  },
  {
    title: '常见问题',
    content:
      '<p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">印度在线投注网站的常见问题</font> <font face="Calibri">(FAQ)</font></span></span></span></span></p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">如何在</font> </span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun">&nbsp;<font face="Calibri">India </font><font face="SimSun">进行在线投注？</font></span></span></span></span></p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span>&nbsp;<span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">可以用印度卢比在线投注吗？</font></span></span></span></span></p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">印度的在线投注网站安全吗？</font></span></span></span></span></p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">印度还有哪些其他在线投注方式？</font></span></span></span></span></p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">在线投注需要什么？</font></span></span></span></span></p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">印度在线投注的付款方式有哪些？</font></span></span></span></span></p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">如何领取</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">的</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="Calibri">PGPC</font></span></span><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">投注奖金？</font></span></span></span></span></p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">最低在线投注赔率是多少？</font></span></span></span></span></p><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:SimSun"><font face="SimSun">最低存款和取款金额（印度卢比）是多少？</font></span></span></span></span></p><p style="text-align:justify">&nbsp;</p><p style="text-align:justify">&nbsp;</p><p style="text-align:justify">&nbsp;</p>',
    bgColor: null,
    lang: 'CN',
    display: true,
    tag: 'faqs',
    children: [
      {
        title: '如何在 PGPC 进行在线投注？',
        content:
          '<p>PGPC 在线投注非常简单。只需在我们的网站上注册或下载我们的应用程序即可。您可以在 PGPC&nbsp; 的网站上找到多种可供投注的运动，包括板球、网球、足球、棒球、排球、卡巴迪等等。您可以找到许多当前正在进行或安排在不久的将来某个时间进行的比赛。选择您想要投注的适当投注选项/市场，然后您将在 PGPC（印度顶级投注网站之一）开始投注</p>',
        bgColor: null,
        lang: 'CN',
        display: true,
        tag: null,
      },
      {
        title: 'PGPC 可以用印度卢比在线投注吗？',
        content:
          '<p>PGPC&nbsp; 是印度最好的在线投注网站之一，允许您以印度卢比投注。因此，印度投注者无需兑换当地货币即可进行投注。只需访问 PGPC&nbsp; 的门户网站并开始以印度卢比在线投注。</p>',
        bgColor: null,
        lang: 'CN',
        display: true,
        tag: null,
      },
      {
        title: '印度的在线投注网站安全吗？',
        content: '<p>是的，PGPC&nbsp; 是印度最安全的在线投注网站。明智的做法是仅使用经过许可且受到独立监管的认可在线投注网站</p>',
        bgColor: null,
        lang: 'CN',
        display: true,
        tag: null,
      },
      {
        title: '印度还有哪些其他在线投注方式？',
        content: '<p>您还可以在 PGPC?的在线赌场下注，玩老虎机、二十一点和轮盘赌等游戏。</p>',
        bgColor: null,
        lang: 'CN',
        display: true,
        tag: null,
      },
      {
        title: '在线投注需要什么？',
        content:
          '<p>当您需要注册时，印度的在线投注网站需要您提供以下证明。</p><p>- 有效的地址、电子邮件地址和手机号码</p><p>- 从您的账户存入和提取资金的合法支付方式</p>',
        bgColor: null,
        lang: 'CN',
        display: true,
        tag: null,
      },
      {
        title: '印度在线投注的付款方式有哪些？',
        content: '<p>提供以下付款方式：</p><p>- UPI 应用程序</p><p>-Netbanking</p>',
        bgColor: null,
        lang: 'CN',
        display: true,
        tag: null,
      },
      {
        title: '如何领取PGPC的PGPC投注奖金？',
        content:
          '<p>1.点击按钮立即领取PGPC奖金。</p><p>2.输入您的详细信息创建一个新的 PGPC?帐户。</p><p>3.使用我们的任何付款方式存款PGPC。</p><p>4.进入我的促销页面并激活欢迎奖金。<br />5.邀请朋友获得邀约奖金</p>',
        bgColor: null,
        lang: 'CN',
        display: true,
        tag: null,
      },
      {
        title: '最低在线投注赔率是多少？',
        content:
          '<p>投注网站通常会为可行的投注设置最低赔率，例如，最低赔率可能固定为 (2.00)，这将要求您将获胜投注设置为 2.00 或更高才能获得资格。</p>',
        bgColor: null,
        lang: 'CN',
        display: true,
        tag: null,
      },
      {
        title: '最低存款和取款金额（印度卢比）是多少？',
        content:
          '<p>PGPC 是印度最好的在线投注网站之一，允许您以印度卢比投注。因此，印度投注者无需兑换当地货币即可进行投注。只需访问 PGPC 的门户网站并开始以印度卢比在线投注。</p>',
        bgColor: null,
        lang: 'CN',
        display: true,
        tag: null,
      },
    ],
  },
]

const VI = [
  {
    title: 'Về chúng tôi',
    content:
      '<p>Ch&agrave;o mừng đến với XX 平台<br />- nh&agrave; cung cấp tr&ograve; chơi trực tuyến từng đoạt giải thưởng.<br />Được th&agrave;nh lập v&agrave;o năm 2006, XX 平台 nhanh ch&oacute;ng ph&aacute;t triển thương hiệu v&agrave; danh tiếng của m&igrave;nh với tư c&aacute;ch l&agrave; c&ocirc;ng ty dẫn đầu thị trường trong ng&agrave;nh c&ocirc;ng nghiệp tr&ograve; chơi trực tuyến to&agrave;n cầu. Thương hiệu được th&agrave;nh lập với c&aacute;c nguy&ecirc;n tắc cốt l&otilde;i của niềm tin v&agrave; uy t&iacute;n, x&aacute;c định c&aacute;c đặc t&iacute;nh cho c&aacute;c hoạt động của c&ocirc;ng ty cho đến ng&agrave;y nay. XX 平台; đ&atilde; li&ecirc;n tục thể hiện sự tập trung r&otilde; r&agrave;ng v&agrave;o việc l&agrave;m phong ph&uacute; trải nghiệm chơi game của bạn. XX 平台 tự h&agrave;o cung cấp cho bạn nhiều thương hiệu tr&ograve; chơi trực tuyến, mỗi thương hiệu cung cấp nhiều tr&ograve; chơi, cơ hội, giải thưởng độc đ&aacute;o, th&uacute; vị v&agrave; hấp dẫn của ri&ecirc;ng m&igrave;nh.</p><p>N&oacute; c&oacute; hợp ph&aacute;p kh&ocirc;ng?<br />Ch&uacute;ng t&ocirc;i điều h&agrave;nh s&ograve;ng bạc của m&igrave;nh theo giấy ph&eacute;p tr&ograve; chơi của Philippines do PAGCOR cấp. PAGCOR l&agrave; cơ quan quản l&yacute; độc lập đảm bảo c&aacute;c s&ograve;ng bạc tu&acirc;n thủ c&aacute;c th&ocirc;ng lệ v&agrave; quy định &aacute;p dụng cho c&aacute;c s&ograve;ng bạc trực tuyến</p><p>Điều n&agrave;y c&oacute; nghĩa l&agrave; ch&uacute;ng t&ocirc;i tu&acirc;n theo c&aacute;c quy tắc nghi&ecirc;m ngặt nhất khi n&oacute;i đến bảo vệ người chơi v&agrave; chơi tr&ograve; chơi c&oacute; tr&aacute;ch nhiệm, v&agrave; rằng Người chơi của ch&uacute;ng t&ocirc;i được ph&aacute;p luật bảo vệ.</p><p>N&oacute; c&oacute; an to&agrave;n kh&ocirc;ng?<br />Đ&uacute;ng! ch&uacute;ng t&ocirc;i c&oacute; đội ngũ kỹ thuật gi&aacute;m s&aacute;t 24/7 kh&ocirc;ng ngừng suốt cả năm. Ch&uacute;ng t&ocirc;i tu&acirc;n thủ c&aacute;c ti&ecirc;u chuẩn bảo mật cao nhất v&agrave; thực hiện ch&uacute;ng trong mọi lĩnh vực hoạt động của ch&uacute;ng t&ocirc;i. Với việc sử dụng c&aacute;c chương tr&igrave;nh v&agrave; giao thức h&agrave;ng đầu trong lĩnh vực n&agrave;y, ch&uacute;ng t&ocirc;i đảm bảo sự an to&agrave;n v&agrave; to&agrave;n vẹn của th&ocirc;ng tin c&aacute; nh&acirc;n của bạn mọi l&uacute;c.</p>',
    bgColor: null,
    lang: 'VI',
    display: true,
    tag: 'aboutus',
  },
  {
    title: 'Tiền gửi',
    content:
      '<p>Tiền gửi<br />C&aacute;c t&ugrave;y chọn gửi tiền được cung cấp c&oacute; thể kh&aacute;c nhau t&ugrave;y thuộc v&agrave;o quốc gia cư tr&uacute; của bạn, để biết th&ocirc;ng tin ch&iacute;nh x&aacute;c về c&aacute;c phương thức c&oacute; sẵn cho bạn, vui l&ograve;ng truy cập trung t&acirc;m th&agrave;nh vi&ecirc;n.</p><p>Bạn sẽ nhận được số dư trong v&ograve;ng 5 ph&uacute;t trong hầu hết thời gian</p><p>Thời gian gửi tiền c&oacute; sẵn<br />Mở cửa trong 24 giờ</p><p>Giới hạn số tiền k&yacute; quỹ<br />Chuyển khoản ng&acirc;n h&agrave;ng ： Chuyển khoản ng&acirc;n h&agrave;ng: tối thiểu 50 USD hoặc bằng, tối đa 2000 USD hoặc bằng</p><p>Kh&aacute;c ： tối thiểu 80 USD hoặc bằng, tối đa 3000 USD hoặc bằng</p><p>C&aacute;c phương thức thanh to&aacute;n<br />Những g&igrave; ch&uacute;ng t&ocirc;i đ&atilde; hỗ trợ: chuyển khoản ng&acirc;n h&agrave;ng v&agrave; c&aacute;c</p><p>Ch&uacute;ng t&ocirc;i đang tiếp tục l&agrave;m việc với c&aacute;c giải ph&aacute;p thanh to&aacute;n, nếu bạn kh&ocirc;ng nhận được số dư trong v&ograve;ng 20 ph&uacute;t, vui l&ograve;ng li&ecirc;n hệ với ch&uacute;ng t&ocirc;i để biết th&ocirc;ng tin trong tương lai</p>',
    bgColor: null,
    lang: 'VI',
    display: true,
    tag: 'deposit',
    children: [
      {
        title: 'Rupeelink Deposit Tutorial',
        content:
          '<p><img alt="" src="https://images.11029984.com/wsd-images-prod/wic11f3/help_center/wps_rupeelink_user_guide-02_(2)_20241129143815.jpg" /></p>',
        bgColor: null,
        lang: 'VI',
        display: true,
        tag: null,
      },
    ],
  },
  {
    title: 'Rút tiền',
    content:
      '<p>XX 平台 sẽ thanh to&aacute;n sau 10 ph&uacute;t trong hầu hết thời gian</p><p>Thời gian r&uacute;t tiền<br />Bạn c&oacute; thể y&ecirc;u cầu r&uacute;t tiền sau 24 giờ<br />XX 平台 sẽ thanh to&aacute;n trong v&ograve;ng 10 ph&uacute;t trong hầu hết thời gian, vui l&ograve;ng tham khảo một cổng thanh to&aacute;n cụ thể.</p><p>Số tiền r&uacute;t<br />Tối thiểu cho mỗi y&ecirc;u cầu: 100 USD hoặc bằng.<br />Tối đa mỗi ng&agrave;y: 100.000 USD hoặc bằng.<br />Lưu &yacute;: bạn phải đạt doanh thu mới c&oacute; thể y&ecirc;u cầu r&uacute;t tiền.</p><p>Ph&iacute; r&uacute;t tiền<br />Ch&uacute;ng t&ocirc;i kh&ocirc;ng t&iacute;nh ph&iacute; r&uacute;t tiền。</p><p>Kh&ocirc;ng r&uacute;t tiền được?<br />Nếu bạn đ&atilde; đạt đến doanh thu để r&uacute;t tiền?<br />Nếu bạn c&oacute; tiền thưởng đang hoạt động, bạn kh&ocirc;ng thể r&uacute;t số dư tiền thưởng của m&igrave;nh cho đến khi tiền thưởng ho&agrave;n tất.<br />Nếu bạn cung cấp sai th&ocirc;ng tin ng&acirc;n h&agrave;ng hoặc ng&acirc;n h&agrave;ng bị đ&oacute;ng băng?<br />L&agrave;m thế n&agrave;o để chỉnh sửa th&ocirc;ng tin c&aacute; nh&acirc;n của t&ocirc;i?<br />Vui l&ograve;ng li&ecirc;n hệ với bộ phận hỗ trợ kh&aacute;ch h&agrave;ng để thay đổi t&agrave;i khoản ng&acirc;n h&agrave;ng ch&iacute;nh x&aacute;c, t&ecirc;n người nhận thanh to&aacute;n, v.v.</p>',
    bgColor: null,
    lang: 'VI',
    display: true,
    tag: 'withdraw',
  },
  {
    title: 'Trò chơi',
    content: '<h1>&nbsp;</h1><p>&nbsp;</p>',
    bgColor: null,
    lang: 'VI',
    display: true,
    tag: 'game',
  },
  {
    title: 'Câu hỏi thường gặp',
    content:
      '<h1>C&acirc;u hỏi thường gặp</h1><h2>Giới thiệu về c&aacute;c tr&ograve; chơi<br /><br />T&ocirc;i c&oacute; thể kiểm tra hồ sơ giao dịch của m&igrave;nh trong bao nhi&ecirc;u ng&agrave;y?</h2><p>Bạn c&oacute; thể thấy hồ sơ giao dịch của m&igrave;nh trong v&ograve;ng 30 ng&agrave;y</p><h2>T&ocirc;i c&oacute; thể kiểm tra luật chơi v&agrave; c&aacute;ch chơi ở đ&acirc;u?</h2><p>Bạn c&oacute; thể thấy c&aacute;c quy tắc trong cửa sổ tr&ograve; chơi tương ứng, người d&ugrave;ng được ph&eacute;p kiểm tra c&aacute;c quy tắc của tr&ograve; chơi.</p><h2>L&agrave;m c&aacute;ch n&agrave;o để biết lịch sử kết quả tr&ograve; chơi?</h2><p>Phương thức hiển thị kh&aacute;c nhau t&ugrave;y thuộc v&agrave;o c&ocirc;ng ty tr&ograve; chơi, nhưng bạn c&oacute; thể kiểm tra lịch sử từ Th&agrave;nh vi&ecirc;n trong menu trang chủ, bằng c&aacute;ch nhấp v&agrave;o Bản ghi cược để biết lịch sử kết quả tr&ograve; chơi.</p><h2>Bạn n&ecirc;n l&agrave;m g&igrave; khi internet bị ngắt kết nối trong khi chơi game</h2><p>Nếu bạn bị ngắt kết nối giữa hoặc trước hoặc sau trận đấu, trước ti&ecirc;n ch&uacute;ng t&ocirc;i sẽ kiểm tra lịch sử tr&ograve; chơi. Nếu tr&ograve; chơi bị ngắt kết nối sớm, tr&ograve; chơi sẽ tiếp tục v&agrave;o lần đăng nhập tiếp theo. Nếu bạn gặp bất kỳ vấn đề g&igrave;, vui l&ograve;ng li&ecirc;n hệ với ch&uacute;ng t&ocirc;i c&agrave;ng sớm c&agrave;ng tốt ..</p><h2>T&ocirc;i c&oacute; thể chơi tr&ograve; chơi tr&ecirc;n điện thoại di động của m&igrave;nh kh&ocirc;ng?</h2><p>C&oacute;, bạn c&oacute; thể chơi slot trực tuyến bằng điện thoại th&ocirc;ng minh. Bạn c&oacute; thể thưởng thức c&aacute;c tr&ograve; chơi đ&aacute;nh bạc trực tuyến của ch&uacute;ng t&ocirc;i th&ocirc;ng qua tr&igrave;nh duyệt internet của bạn hoặc tải xuống ứng dụng của ch&uacute;ng t&ocirc;i, ứng dụng n&agrave;y c&oacute; sẵn cho cả thiết bị Android v&agrave; iOS.</p><h1>Ng&acirc;n h&agrave;ng li&ecirc;n quan</h1><h2>Đăng k&yacute; thẻ của bạn</h2><p>Bạn c&oacute; thể đăng k&yacute; 2 thẻ trong t&agrave;i khoản của m&igrave;nh v&agrave; một t&agrave;i khoản ng&acirc;n h&agrave;ng chỉ được ph&eacute;p đăng k&yacute; dưới một t&agrave;i khoản người d&ugrave;ng. Bạn kh&ocirc;ng được ph&eacute;p d&ugrave;ng chung một thẻ ng&acirc;n h&agrave;ng giữa nhiều người d&ugrave;ng. Nếu bạn muốn x&oacute;a hoặc sửa đổi th&ocirc;ng tin ng&acirc;n h&agrave;ng của m&igrave;nh, vui l&ograve;ng li&ecirc;n hệ với ch&uacute;ng t&ocirc;i.</p><h2>Để &yacute;</h2><ul>\t<li>Vui l&ograve;ng nhập th&ocirc;ng tin ng&acirc;n h&agrave;ng ch&iacute;nh x&aacute;c, chẳng hạn như ng&acirc;n h&agrave;ng, số t&agrave;i khoản ng&acirc;n h&agrave;ng v&agrave; t&ecirc;n người nhận thanh to&aacute;n. Bạn kh&ocirc;ng thể sửa đổi n&oacute; sau khi gửi</li>\t<li>Th&ocirc;ng tin t&agrave;i khoản ng&acirc;n h&agrave;ng đang sử dụng để r&uacute;t tiền, bạn kh&ocirc;ng cần phải cung cấp khi đăng k&yacute; với ch&uacute;ng t&ocirc;i. Tuy nhi&ecirc;n, bạn phải đăng k&yacute; t&agrave;i khoản ng&acirc;n h&agrave;ng trước khi r&uacute;t tiền.</li></ul><h2>Bảo vệ</h2><h2>Nền tảng XX c&oacute; an to&agrave;n kh&ocirc;ng?</h2><p>Sau khi đăng nhập, tất cả th&ocirc;ng tin được gửi đến v&agrave; đi từ trang web đều được m&atilde; h&oacute;a bằng c&ocirc;ng nghệ Lớp cổng bảo mật (SSL) 128-bit.<br />T&iacute;nh bảo mật của c&aacute;c hệ thống v&agrave; ứng dụng của XX được c&aacute;c chuy&ecirc;n gia bảo mật của b&ecirc;n thứ ba kiểm tra nhiều lần mỗi năm. Hơn nữa, ch&uacute;ng t&ocirc;i c&oacute; Hệ thống ph&aacute;t hiện x&acirc;m nhập gi&aacute;m s&aacute;t tất cả lưu lượng mạng 24/7 để t&igrave;m c&aacute;c dấu hiệu tấn c&ocirc;ng hoặc x&acirc;m nhập</p><h2>T&agrave;i khoản của t&ocirc;i c&oacute; được lưu kh&ocirc;ng?</h2><p>XX 平台 đang sử dụng 2 mật khẩu kh&aacute;c nhau để đăng nhập v&agrave; r&uacute;t tiền; bạn cũng c&oacute; thể sử dụng google-authenticator để bảo mật ở cấp độ tiếp theo.<br />Sau khi đăng nhập, tất cả th&ocirc;ng tin được gửi đến v&agrave; đi từ trang web đều được m&atilde; h&oacute;a bằng c&ocirc;ng nghệ Lớp cổng bảo mật (SSL) 128-bit.</p><h2>Chứng kho&aacute;n quỹ</h2><p>XX 平台 hợp t&aacute;c với nhiều tổ chức bảo mật t&agrave;i ch&iacute;nh quốc tế, ch&uacute;ng t&ocirc;i đ&atilde; ph&aacute;t triển c&ocirc;ng nghệ m&atilde; h&oacute;a bảo vệ an to&agrave;n giao dịch quỹ h&agrave;ng đầu trong ng&agrave;nh, đảm bảo ho&agrave;n to&agrave;n sự an to&agrave;n của người d&ugrave;ng trong qu&aacute; tr&igrave;nh nạp v&agrave; r&uacute;t tiền, đồng thời hiệu suất ổn định v&agrave; nhanh ch&oacute;ng hơn, đ&aacute;ng tin cậy .。</p><p>Bạn phải nhập mật khẩu quỹ của m&igrave;nh cho mỗi lần r&uacute;t tiền.</p><p>Bạn kh&ocirc;ng thể sửa đổi c&aacute;c chi tiết</p><p>Bạn kh&ocirc;ng thể xem chi tiết ng&acirc;n h&agrave;ng sau khi đăng k&yacute; t&agrave;i khoản ng&acirc;n h&agrave;ng của m&igrave;nh</p><h2>Tr&ograve; chơi c&oacute; tr&aacute;ch nhiệm</h2><p>Ch&uacute;ng t&ocirc;i quan t&acirc;m đến người chơi của m&igrave;nh v&agrave; muốn đảm bảo rằng bất kỳ thời gian n&agrave;o d&agrave;nh cho ch&uacute;ng t&ocirc;i cũng đều vui vẻ. Việc đặt cược phải lu&ocirc;n trong khả năng của bạn v&agrave; kh&ocirc;ng ảnh hưởng ti&ecirc;u cực đến bạn cả về t&agrave;i ch&iacute;nh hay x&atilde; hội.<br />Với tư c&aacute;ch l&agrave; Nh&agrave; điều h&agrave;nh c&oacute; tr&aacute;ch nhiệm từng đoạt giải thưởng, ch&uacute;ng t&ocirc;i cung cấp kiến thức chuy&ecirc;n m&ocirc;n để hướng dẫn, tư vấn v&agrave; giữ cho bạn chơi an to&agrave;n.</p>',
    bgColor: null,
    lang: 'VI',
    display: true,
    tag: 'faqs',
    children: [
      {
        title: 'How to place bets online at PGPC ?',
        content:
          '<p>Betting online with PGPC is easy. Just register on our website or download our app. You can find a wide range of sports available for betting on PGPC&rsquo;s website including cricket, tennis, football, baseball, volleyball, kabaddi and many more. You can find many contests that are currently underway or scheduled for some time in the near future. Select the appropriate betting option/market you want to bet on and you will start betting at PGPC, one of the top betting sites in India</p>',
        bgColor: null,
        lang: 'VI',
        display: true,
        tag: null,
      },
      {
        title: 'PGPC Can I place bets online with Indian rupees?',
        content:
          '<p>PGPC is one of the best online betting sites in India that allows you to bet in Indian Rupees. Therefore, Indian bettors do not need to exchange local currency to place their bets. Just visit PGPC&rsquo;s portal and start betting online in Indian Rupees.</p>',
        bgColor: null,
        lang: 'VI',
        display: true,
        tag: null,
      },
      {
        title: 'Are online betting sites in India safe?',
        content:
          '<p>Yes, PGPC is the safest online betting website in India. It is wise to only use approved online betting sites that are licensed and independently regulated</p>',
        bgColor: null,
        lang: 'VI',
        display: true,
        tag: null,
      },
      {
        title: 'What other ways to bet online in India?',
        content:
          '<p>You can also place bets and play games like slots, blackjack, and roulette at PGPC&rsquo;s online casino.</p>',
        bgColor: null,
        lang: 'VI',
        display: true,
        tag: null,
      },
      {
        title: 'What do you need to bet online?',
        content:
          '<p>Online betting sites in India require the following proof from you when you need to register.</p><p>- Valid address, email address and mobile phone number</p><p>- Legal payment methods to deposit and withdraw funds from your account</p>',
        bgColor: null,
        lang: 'VI',
        display: true,
        tag: null,
      },
      {
        title: 'What are the payment methods for online betting in India?',
        content: '<p>The following payment methods are available:</p><p>- UPI App</p><p>-Netbanking</p>',
        bgColor: null,
        lang: 'VI',
        display: true,
        tag: null,
      },
      {
        title: 'How to claim PGPC betting bonus from PGPC?',
        content:
          '<p>How to claim PGPC betting bonus from PGPC?<br />1. Click the button to claim your PGPC bonus immediately.<br />2. Enter your details to create a new PGPC account.</p><p>3. Deposit PGPC using any of our payment methods.</p><p>4. Go to the My Promotions page and activate the welcome bonus.<br />5. Invite friends to get invitation bonuses<br />&nbsp;</p>',
        bgColor: null,
        lang: 'VI',
        display: true,
        tag: null,
      },
      {
        title: 'What are the lowest online betting odds?',
        content:
          '<p>Betting sites will often set minimum odds for viable bets, for example the minimum odds may be fixed at (2.00) which will require you to set your winning bet at 2.00 or higher to qualify.<br />&nbsp;</p>',
        bgColor: null,
        lang: 'VI',
        display: true,
        tag: null,
      },
      {
        title: 'What is the minimum deposit and withdrawal amount in Indian Rupees?',
        content:
          '<p>Online betting sites using Indian rupees have different minimum deposit and withdrawal amounts. Some bookmakers offer minimum deposits as low as ?10, while the minimum and maximum withdrawal amounts depend on the market as well as the chosen payment method.</p>',
        bgColor: null,
        lang: 'VI',
        display: true,
        tag: null,
      },
    ],
  },
]

export const helpListMap = { HD, EN, ZH, VI }
