class LoadXML{


    fileName = "";
    ////构造函数
    LoadXML(fileNameTemp){
        fileName = fileNameTemp;
    }
    createXMLDom(){
        if (window.ActiveXObject) 
         var xmldoc=new ActiveXObject("Microsoft.XMLDOM");
        else
         if (document.implementation&&document.implementation.createDocument)
          var xmldoc=document.implementation.createDocument("","doc",null);
        xmldoc.async = false;
        //为了和FireFox一至，这里不能改为False;
        xmldoc.preserveWhiteSpace=true;
        return xmldoc;
      }
}

