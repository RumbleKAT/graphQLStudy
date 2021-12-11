const request = require('request');

const url = 'http://openapi.reb.or.kr/OpenAPI_ToolInstallPackage/service/rest/ApplyhomeInfoSvc/getLttotPblancList';
const serviceKey = 'mwqmHdyqQo5ani9pF4/D/CGPVS+mVuf0xxR6rEeDJhDH39HGTKCTRe/WANeu4WQMPNEDyPSlYEYWPaCtvC9trA==';

const getParam = (param) => {
    var queryParams = '?' + encodeURIComponent('serviceKey') + `=${param.serviceKey}`; /* Service Key*/
    queryParams += '&' + encodeURIComponent('startmonth') + '=' + encodeURIComponent(param.startMonth); /* */
    queryParams += '&' + encodeURIComponent('endmonth') + '=' + encodeURIComponent(param.endMonth); /* */
    queryParams += '&' + encodeURIComponent('houseSecd') + '=' + encodeURIComponent(param.houseSecd); /* */
    queryParams += '&' + encodeURIComponent('sido') + '=' + encodeURIComponent(param.sido); /* */
    queryParams += '&' + encodeURIComponent('houseName') + '=' + encodeURIComponent(param.houseName); /* */
    queryParams += '&' + encodeURIComponent('rentSecd') + '=' + encodeURIComponent(param.rentSecd); /* */
    return queryParams
}

const queryParams = getParam({
    serviceKey : this.serviceKey,
    startMonth : 202101,
    endMonth : 202103,
    houseSecd : 01,
    sido: '강원',
    houseName : '횡성 벨라시티',
    rentSecd : 0
})

request({
    url : url + queryParams,
    method : 'GET',
},(err,res,body) => {
    console.log('Status', res.statusCode);
    console.log('Headers', JSON.stringify(res.headers));
    console.log('Reponse received', body);
    return res.statusCode
})