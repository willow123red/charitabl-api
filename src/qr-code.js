import axios from 'axios'

const url='http://api.qrserver.com/v1/create-qr-code/?data=Slumdogs&size=100x100';
axios.get(url)
.then(data=>console.log(data))
.catch(err=>console.log(err));

const url2='http://api.qrserver.com/v1/create-qr-code/?data=Feed%20me!&size=100x100';
axios.get(url2)
.then(data=>console.log(data))
.catch(err=>console.log(err));

const url3='http://api.qrserver.com/v1/create-qr-code/?data=www.news.com.au&size=100x100';
axios.get(url3)
.then(data=>console.log(data))
.catch(err=>console.log(err));
