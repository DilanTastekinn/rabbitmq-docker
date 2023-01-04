*Rabbitmq kullanım alanları*

 - Arka plan hizmetlerinin çok olduğu işlemlerde,(son kullanıcıyı
   etkilemeyen işlemlerde <email gönderilmesi>--email gönderene kadar
   kullanıcıyı bekletmez işlemi yapar sonra emaili gönderir.)
 - Anlık işlemlerin çok önemli olmadığı alanlarda,(yukarıdaki örnekteki
   gibi)
 - Veri tutarlılığının çok önemli olduğu işlemlerde,(Örnek:Borsa
   verileri anlık değişebilir.Her borsa verisini alıp ilgili sunucuya
   gönderirken arada network kopması-sunucuda hata gibi problemlerle
   verinin gitmeme durumu olabilir.Tam bu noktada rabbitmq yu
   kullanmanın avantajı ile mesaj rabbitmq ya bırakılır ilgili yer alana
   kadar saklanır beklenir ve veri kaybolmamış olur.)
 - İşlem hacminin büyük olduğu işlemlerde(borsa)
 
![Alt text](/home/dilan/Pictures/Screenshots/deneme.png?raw=true "Title")

Producer tarafından gönderilen mesajın özelliklerine bakarak hangi kuyruğa gönderilmesi gerektiğine **exchange** Routing özelliklerine bakarak karar verir.
Chanel mesajın consumer a ulaşıp ulaşmadığı bilgisini verir.

***Exchange Çeşitleri***
*Direct Exchange*
Routing key ile eşleşen gueue ya gönderir.
*Topic Exchange*
<.> Kendisinden sonraki kelime sayısını verir. health.* kendisinden sonra ki 1 kelimeyi alır health.*.* olursa bir kelime daha ama <#> kullanılırsa health.#  kendisinden sonra kaç kelime gelmiş önemli olmuyor.
*Fanout Exchange*
Gelen mesajın herhangibir özelliğine bakmaksızın tüm queue lara gönderir.
*Header Exchange*
Mesajın içindeki header ile queue içindeki header ları karşılaştırıyor.
*Default Exchange*
Tipini belirlemediğimiz exchange bize gelen routing key ile aynı isimde queue ye gider.
*Dead Letter Exchange*
Herhangibir queue gitmeyen mesajı silme işlemi




