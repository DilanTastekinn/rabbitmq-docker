# RabbitMQ

RabbitMQ bir mesaj kuyruğu sistemidir. Amacı herhangi bir kaynaktan alınan bir mesajın, bir başka kaynağa sırası geldiği anda iletilmesidir. Yapılacak işler bir sıraya alınmaktadır. Yani iletimin yapılacağı kaynak ayağa kalkana kadar, tüm işlemler bir quee’de sıralanabilir.RabbitMQ çoklu işletim sistemine destek vermesi ve açık kaynak kodlu olması da en büyük tercih sebeplerinden birisidir.Mesajlar otomatik olarak kopyalanmaz, ancak kullanıcı bunları kopyalanacak şekilde manuel olarak yapılandırabilir.Mesajların kalıcı (persistent) olması için persistent modunda kullanmanız gerekmektedir. Aksi takdirde RabbitMQ servisi restart olduğunda tüm mesajlar kaybolacaktır.**Kafka’ya göre daha az sayıda mesajlaşma yapılıyorsa (resmi verilere göre ortalama 15K data fakat çok daha fazlasını karşılayabilir),Yüksek hacimli mesajlaşma için uygun olmayabilir.**
Farklı protokoller destekler(AMQP 0–9–1, STOMP, MQTT, AMQP 1.0)

_Rabbitmq kullanım alanları_

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

![Alt text](/home/dilan/Pictures/Screenshots/)

Producer tarafından gönderilen mesajın özelliklerine bakarak hangi kuyruğa gönderilmesi gerektiğine **exchange** Routing özelliklerine bakarak karar verir.
Chanel mesajın consumer a ulaşıp ulaşmadığı bilgisini verir.

**_Exchange Çeşitleri_**
_Direct Exchange_
Routing key ile eşleşen gueue ya gönderir.
_Topic Exchange_
<.> Kendisinden sonraki kelime sayısını verir. health._ kendisinden sonra ki 1 kelimeyi alır health._.* olursa bir kelime daha ama <#> kullanılırsa health.# kendisinden sonra kaç kelime gelmiş önemli olmuyor.
*Fanout Exchange*
Gelen mesajın herhangibir özelliğine bakmaksızın tüm queue lara gönderir.
*Header Exchange*
Mesajın içindeki header ile queue içindeki header ları karşılaştırıyor.
*Default Exchange*
Tipini belirlemediğimiz exchange bize gelen routing key ile aynı isimde queue ye gider.
*Dead Letter Exchange\*
Herhangibir queue gitmeyen mesajı silme işlemi

# Rabbit MQ Kurulum komutları

$sudo apt install rabbitmq-server
$syctemctl status rabbitmq-server.service
$sudo service rabbitmq-server restart
$systemctl is-enabled rabbitmq-server.service
$sudo ss -tunelp | grep 15672 => rabbitmq için açılacak port belirleniyor.
$sudo ufw allow proto tcp from any port 5672,15672 => Kullanıcı adı
$sudo rabbitmqctl add_user admin StrongPassword =>Sifre belirlenir
$ip a=>> bakarak localhost adresi alınır 192.**..**
$rabbitmqadmin delete queue name=name_of_queue

# RabbitMQ Docker

$docker run -d -p 15673:15673 -p 5673:5673 --name test rabbitmq:3-management
$sudo rabbitmqctl add_user test password
$sudo rabbitmqctl set_user_tags test administrator
$sudo rabbitmqctl set*permissions -p / test ".*" ".\_" ".\*"

# Rabbit MQ Ile Olusturulan Projede Kullanılabilecek Komutlar

$sudo rabbitmq-server start
$rabbitmqctl shutdown -n [rabbit](mailto:rabbit@prod)
$sudo -u rabbitmq rabbitmqctl stop
$sudo rabbitmq-server start
$sudo rabbitmqctl status
$journalctl -xeu rabbitmq-server.service =>restart işlemi için
$sudo rabbitmq-server

**Projeyi çalıştırabilmek için terminale **sudo docker-compose up** yazıp projeyi aktif ediyoruz ve yanına açtığımız diğer terminale **$npm run start:producer** yazıp rabbitmq ya gönderiyoruz.Farklı terminaller açarak onlara da **$npm run start:consumer **ve **$npm run start:consumer1** yazarak message gueue den gelen mesajları okuyoruz. **

Portumuz:http://192.168.1.147:1236
