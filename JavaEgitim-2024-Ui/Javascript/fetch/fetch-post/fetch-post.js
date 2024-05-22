

//POST ile datayı kydedeceğiz

const postForm=document.getElementById('post-form');

postForm.addEventListener('submit', function(event){
   
event.preventDefault();  //varsayılanı engelle event geldiğinde alert vermesi için

debugger;
    const title = document.getElementById('title').value;
    console.log(title)

    const body = document.getElementById('body').value;
    console.log(body)

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',

        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({   //string ifadeleri JSON'a çevirecek

            title:title,    //key, value. Eğer bu ikisi aynı olursa sadece key olarak yazabilirsin
            body:body,
            userId:1,  
        })
    }).then(response => response.json())
    .then(data => {
        console.log('Oluşturulan gönderi:',data);

         // İsteği başarıyla tamamladığınızı kullanıcıya alert(uyarı vererek)bildirebilirsiniz
        alert('Gönderi başarıyla oluşturuldu!')

        //Formu temizle

        postForm.requestFullscreen();


    })
    .catch(error =>{
        console.error('Error:', error);
    })
    console.log('Gönderi oluşturuldu')
});