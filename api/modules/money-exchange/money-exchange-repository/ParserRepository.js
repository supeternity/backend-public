const browser = require('request');
const cheer = require('cheerio');
const util = require('util');
const fs = require('fs');

const MongoClient = require('mongodb').MongoClient;

const dbUrl = util.format(
    'mongodb://%s:%s@%s/?replicaSet=%s&authSource=%s&ssl=true',
    'REMOVED',
    'REMOVED',
    [
        'REMOVED'
    ].join(','),
    'REMOVED',
    'REMOVED'
)


const dbOptions = {
  sslValidate: true,
  checkServerIdentity: false,
  sslCA: fs.readFileSync('/usr/local/share/ca-certificates/Yandex/YandexInternalRootCA.crt')
  // sslCA: createBaseSertificate()
}

console.log(dbOptions.sslCA);


// data base begin
const getBase = () => new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, dbOptions, (err, db) => {
        if (err) {
            console.log(`mongo connection error: ${err}`);
            reject(err);
        } else {
            let dbo = {};
            dbo.client = db.db("exchanger");
            resolve(dbo);
        };
    });
})
const getOne = (col, query) => new Promise((resolve, reject) => {
    col.findOne(query, (err, res) => {
        resolve(res);
    })
})
const dbFind = (col, query) => new Promise((resolve, reject) => {
    col.find(query).toArray((err, res) => {
        if (err) throw err;
        resolve(res);
    })
})
const getOneAndUpdate = (col, query, data) => new Promise((resolve, reject) => {
    col.findOneAndUpdate(query, data, {
        returnOriginal: false,
        upsert: false
    }, (err, res) => {
        if (!err) {
            resolve(res.value);
        } else {
            reject(err);
        }
    });
})
const setUpdateOne = (col, query, data) => new Promise((resolve, reject) => {
    col.updateOne(query, data, {
        upsert: true
    }, (err, res) => {
        if (!err) {
            resolve(res);
        } else {
            reject(err);
        }
    })
})
// data base end

// utility begin
// replacement html special characters for html
const replaceHtmlEntites = (() => {
    let translate_re = /&(nbsp|amp|quot|lt|gt|laquo|raquo);|&(#)/g,
        translate = {
            'nbsp': String.fromCharCode(160),
            'amp': '&',
            'quot': '"',
            'lt': '<',
            'gt': '>',
            'laquo': '«',
            'raquo': '»',
            '#': '№'
        },
        translator = ($0, $1, $2) => {
            if (translate[$1] !== undefined) {
                return translate[$1];
            } else {
                return translate[$2];
            }
        };

    return (s) => {
        return s.replace(translate_re, translator);
    };
})();
// utility end

// scraping error to timilink-email-hub begin
const sendError = async (error) => {
    console.log(error);
}
// scraping error to timilink-email-hub end

// scraping banks-locations begin
const getBankScraping = async (parseURL, cityId, bankName, db) => {

    let parseConf = {
        url: parseURL,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Cookie': 'PHPSESSID=dfe7liq9ngmtdmvh2s6fpb4t56; BANKI_RU_USER_IDENTITY_UID=4756194743764818795; aff_sub3=main; uid=uQo9b1snUal8Ef/NNl2yAg==; _ga=GA1.2.942536903.1529303464; _ym_uid=1529303465616104447; __utmc=241422353; scs=%7B%22t%22%3A1%7D; sbjs_migrations=1418474375998%3D1; sbjs_first_add=fd%3D2018-06-18%2011%3A31%3A05%7C%7C%7Cep%3Dhttp%3A%2F%2Fwww.banki.ru%2F%7C%7C%7Crf%3D%28none%29; sbjs_first=typ%3Dtypein%7C%7C%7Csrc%3D%28direct%29%7C%7C%7Cmdm%3D%28none%29%7C%7C%7Ccmp%3D%28none%29%7C%7C%7Ccnt%3D%28none%29%7C%7C%7Ctrm%3D%28none%29; spUID=15293034654969ab066b49d.61173a51; aff_sub3=main; EmailSoldiers_WebTech=be38707e-94ba-4495-e0f8-e6c264403d1f; flocktory-uuid=177635d1-9dd3-4131-b0d3-91dc162f62b8-9; __utmz=241422353.1529305667.3.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); BANKI_RU_GUEST_ID=546389965; __auc=cd30884016417db223fac804fc3; _ym_d=1530007341; user-region-id=532; BANKI_RU_LAST_ADV=20012; _gid=GA1.2.1088851646.1530511570; _a_d3t6sf=duACZSOITjcs6mx35gwRj8S3; __io_lv=1530511695721; __io_uid_test=15; __io=822049517.14c6b162b_1530511695728; _io_un=; _io_un=; _io_un=2; __gads=ID=558a4874ffa1b28d:T=1530511695:S=ALNI_MbEI_JXK-ps1cjaLxmq7YRN7ubpSg; __utmv=241422353.|1=siteDesign=new=1; _ym_isad=2; decid_png=1125023275; decid_etag=1125023275; decid_cache=1125023275; DEC_ID=1125023275; BANKI_RU_DLDB=1135476647; sbjs_current_add=fd%3D2018-07-03%2018%3A25%3A44%7C%7C%7Cep%3Dhttp%3A%2F%2Fwww.banki.ru%2Fbanks%2Fbank%2Fbinbank%2Fbranches%2Fekaterinburg%2F6743251%2F%7C%7C%7Crf%3Dhttp%3A%2F%2Fwww.banki.ru%2Fbanks%2Fbank%2Fbinbank%2Fekaterinburg%2F; sbjs_current=typ%3Dreferral%7C%7C%7Csrc%3Dbanki.ru%7C%7C%7Cmdm%3Dreferral%7C%7C%7Ccmp%3D%28none%29%7C%7C%7Ccnt%3D%2Fbanks%2Fbank%2Fbinbank%2Fekaterinburg%2F%7C%7C%7Ctrm%3D%28none%29; bank_geo_link=#/!b1:960!s3:office!s4:list!m4:1!p1:1; _ym_visorc_502212=b; __utma=241422353.942536903.1529303464.1530627406.1530629651.23; _ic_c=23..google_organic; ins-gaSSId=03170e71-e3f2-6813-d65d-17d7dd0daa6d_1530633252; views_counter=%7B%22trades.banks.rshb%22%3A%5B532%5D%2C%22trades.banks.bystrobank%22%3A%5B532%5D%2C%22trades.banks.skb-bank%22%3A%5B532%5D%2C%22news%22%3A%5B3737027%5D%2C%22960%22%3A%5B532%5D%2C%228362%22%3A%5B532%5D%7D; current-currency=RUB; FullScreen2017=true; branding-wall_branding_wall=1; NonRobot=153063042704201893fc00c312e571948d30eecbd1992+9e617e9dd4d15ee0a6b8a71e2f0aee9d; __utmt=1; BANKI_RU_BANNERS=452_20055_2_04072018%2C453_6130_4_04072018%2C575_14919_4_04072018%2C1_6656_2_04072018%2C451_19969_4_04072018%2C106_10808_2_04072018%2C1_13352_3_04072018%2C585_22041_2_04072018%2C451_22462_1_04072018%2C452_13573_1_04072018%2C106_797_2_04072018%2C451_22612_5_04072018%2C451_22492_6_04072018%2C451_22126_7_04072018%2C1_6559_2_04072018%2C452_17223_1_04072018%2C585_22057_2_04072018%2C451_21954_2_04072018%2C451_21117_5_04072018%2C451_22496_1_04072018%2C106_10864_6_04072018%2C451_22290_1_04072018%2C451_18314_1_04072018%2C1_6841_2_04072018%2C585_22397_1_04072018%2C452_16005_1_04072018%2C451_21741_1_04072018%2C451_12138_1_04072018%2C452_21504_1_04072018%2C452_20063_1_04072018%2C451_22119_1_04072018%2C451_17312_1_04072018%2C451_21744_1_04072018%2C451_22117_1_04072018%2C1_7270_2_04072018%2C452_13777_2_04072018%2C452_20086_2_04072018%2C413_7471_1_04072018%2C451_21699_1_04072018%2C451_21587_1_04072018%2C451_22304_1_04072018%2C452_17661_1_04072018%2C452_22611_1_04072018%2C452_22517_1_04072018%2C452_22601_1_04072018%2C451_20803_1_04072018%2C106_807_1_04072018; _gat=1; __asc=28b440be16460afd52539d5ce21; sbjs_udata=vst%3D20%7C%7C%7Cuip%3D%28none%29%7C%7C%7Cuag%3DMozilla%2F5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F67.0.3396.87%20Safari%2F537.36; __utmb=241422353.33.8.1530630495019; sbjs_session=pgs%3D12%7C%7C%7Ccpg%3Dhttp%3A%2F%2Fwww.banki.ru%2F; BANKI_RU_LAST_VISIT=03.07.2018+18%3A08%3A42; lplastrequest=Tue Jul 03 2018 20:08:44 GMT+0500 (ÐÐºÐ°ÑÐµÑÐ¸Ð½Ð±ÑÑÐ³, ÑÑÐ°Ð½Ð´Ð°ÑÑÐ½Ð¾Ðµ Ð²ÑÐµÐ¼Ñ); insdrSV=106'
        }
    };

    let bank = new Object();
    bank.query = { 'bank': bankName, 'cityId': +cityId };
    bank.col = db.client.collection("module.money-exchange.banks");
    bank.answer = await getOne(bank.col, bank.query);
    let branch = new Object();
    branch.col = db.client.collection("module.money-exchange.branches");
    branch.answer = await getOne(bank.col, bank.query);

    // ниже хак чтобы отдавать старую выдачу из базы без обновления
    if (bank.answer === null || Math.abs(bank.answer.refresh - Math.round(Date.now() / 1000)) > (60 * 60 * 24 * 7)) {
        bank.answer.refresh = Math.round(Date.now() / 1000);
    }

    if (bank.answer === null || Math.abs(bank.answer.refresh - Math.round(Date.now() / 1000)) > (60 * 60 * 24 * 7)) {
        browser.get(parseConf, async (err, res) => {
            if (!err && res.statusCode === 200) {
                let $ = new Object();
                // *bra - branch (массив с филиалами-json-подобными объектами)
                // banki.ru отправляют его в api яндекс-карт
                // пример по адресу http://www.banki.ru/banks/bank/alfabank/ekaterinburg/ line 1426 (может измениться)
                $.bnk = cheer.load(res.body);
                let jsBra = $.bnk('script:contains("/static/common/dist/components/maps/maps.js")').contents().text().match(/items: \[([^]*)\]/gm);
                jsBra = jsBra[0].replace('items: [', '');
                jsBra = jsBra.replace(/(\s*?{\s*?|\s*?,\s*?)(['"])?([a-zA-Z0-9]+)(['"])?:/g, '$1"$3":');
                jsBra = jsBra.replace(/'/g, '"');
                jsBra = jsBra.replace(/},.*\s*\]/gm, '}');
                jsBra = JSON.parse('[' + jsBra + ']');

                let branchLogo = new Object();
                branchLogo.sourceURL = $.bnk('.bank-page-header__logo').css('background-image');
                branchLogo.sourceURL = branchLogo.sourceURL.replace('url(//', '');
                branchLogo.sourceURL = branchLogo.sourceURL.replace(')', '');
                branchLogo.fileName = branchLogo.sourceURL.match(/[^\/]+$/gs)[0];
                branchLogo.localPath = 'front/modules/money-exchange/logos';

                const filePath = `${branchLogo.localPath}/${branchLogo.fileName}`;
                const isExists = fs.existsSync(filePath);
                if (!isExists) {
                    let res = null;
                    let rej = null;
                    const stream = browser.get('http://' + branchLogo.sourceURL).pipe(fs.createWriteStream(filePath));

                    try {
                        await new Promise((_res, _rej) => {
                            res = _res;
                            rej = _rej;
                            stream.once('close', _res);
                            stream.once('error', _rej);
                        });

                        stream.removeListener('close', _res);
                        stream.removeListener('error', _rej);
                    } catch (err) {
                        //console.log('write logo image error');
                    }
                }

                // каждый объект в массиве jsBra[] содержит ссылку на подробное описание филиала
                // далее проходим по массиву, обращаемся к подробному описанию филиала
                // забираем дополнительно телефон и время работы
                // по интервалу, так как балансер banki.ru блокирует запросы при более
                // чем двух единовременных соединений с одного клиента
                // next grabbing more banks info
                let callExtendBankInfo = (i) => {
                    if (i === jsBra.length) {
                        return false;
                    }
                    return new Promise((resolve, reject) => {
                        if (jsBra[i].type === 'office' || jsBra[i].type === 'branch' || jsBra[i].type === 'main') {
                            browser.get({
                                url: 'http://www.banki.ru' + jsBra[i].detailsHref,
                                headers: parseConf.headers
                            }, (err, res) => {
                                if (!err && res.statusCode === 200) {
                                    $.bnf = cheer.load(res.body);
                                    jsBra[i].tel = $.bnf('.branch__detail__list__item nobr').contents().text();
                                    jsBra[i].time = $.bnf('.branch__detail__item--schedule').eq(0).find('.branch__detail__item__content').contents().text();
                                    let bra = {
                                        lat: +jsBra[i].latitude,
                                        lon: +jsBra[i].longitude,
                                        bank: bankName,
                                        cityId: +cityId,
                                        name: replaceHtmlEntites(jsBra[i].name),
                                        address: jsBra[i].address,
                                        tel: replaceHtmlEntites(jsBra[i].tel),
                                        time: replaceHtmlEntites(jsBra[i].time),
                                        selected: "undefined",
                                        logoFile: branchLogo.fileName,
                                        selectedBranch: false
                                    }
                                    if (
                                        /\d\d\.\d*/gm.test(bra.lat) &&
                                        /\d\d\.\d*/gm.test(bra.lon) &&
                                        typeof(bra.bank) === 'string' &&
                                        typeof(bra.cityId) === 'number' &&
                                        typeof(bra.name) === 'string' &&
                                        typeof(bra.address) === 'string' &&
                                        /\(\d*\)|\d\d\d-\d\d-\d\d|8\s800\s|8800\d*|8\s\(800\)\s\d*/gm.test(bra.tel) &&
                                        /пн\.\-пт\.\:|\d\d\:\d\d|\d\d\:\d\d|сб\.\:|вс\.\:|вск\.\:/gm.test(bra.time) &&
                                        /.*\.gif|.*\.png|.*\.jpg|.*\.jpeg/.test(bra.logoFile)
                                    ) {
                                        branch.query = { 'lat': bra.lat, 'lon': bra.lon };
                                        setUpdateOne(branch.col, branch.query, bra).then(
                                            up => {
                                                resolve(up);
                                            }
                                        ).catch(
                                            err => {
                                                reject(err);
                                            }
                                        );
                                    } else {
                                        const err = `Ошибка парсинга подробной информации о филиале ${bankName} в городе ${cityId}`;
                                        reject(err);
                                    }
                                }
                            });
                        }
                    }).then(
                        res => {
                            return res;
                        }
                    );
                }
                let iBNK = 0;
                let jsBraPromises = [];
                let asyncBankCall = async () => {
                    let d = new Date();
                    if (iBNK === jsBra.length) {
                        //if (iBNK === 1) {
                        clearInterval(jsBraInterval);
                        Promise.all(jsBraPromises).then(
                            branchesUpdate => {
                                ////console.log(allBranches);
                                let write = {
                                    bank: bankName,
                                    cityId: +cityId,
                                    refresh: Math.round(Date.now() / 1000)
                                };
                                setUpdateOne(bank.col, bank.query, write).then(
                                    up => {
                                        //console.log(`update ${bankName} system base: ${up}`);
                                        //console.log(`update ${bankName} branches mongo answer: ${branchesUpdate}`)
                                    }
                                );
                            }, reason => {
                                sendError(reason);
                                let write = {
                                    bank: bankName,
                                    cityId: +cityId,
                                    refresh: Math.round(Date.now() / 1000)
                                };
                                setUpdateOne(bank.col, bank.query, write).then(
                                    up => {
                                        //console.log(`update ${bankName} system base: ${up}`);
                                        //console.log(`update ${bankName} branches mongo answer: ${branchesUpdate}`)
                                    }
                                );
                            }
                        );
                        //console.log(`stop scraping all branches info for ${bankName}`);
                    }
                    //console.log(`${d.toLocaleTimeString()} : call : ${iBNK} : ${bankName}`);
                    jsBraPromises.push(callExtendBankInfo(iBNK));
                    iBNK++;
                }
                // bank cheking ticker of 8987 milliseconds
                let jsBraInterval = setInterval(asyncBankCall, 8987);

            }
        });
        return `start ${bankName} checked... and update... sometime`;
    } else {
        return `${bankName} checked: OK`;
    }

}
// scraping banks-locations end

// scraping banks-rates begin
const getRatesScraping = (parseURL, cityId, update, db) => new Promise((resolve, reject) => {

    let parseConf = {
        url: parseURL,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Cookie': 'PHPSESSID=dfe7liq9ngmtdmvh2s6fpb4t56; BANKI_RU_USER_IDENTITY_UID=4756194743764818795; aff_sub3=main; uid=uQo9b1snUal8Ef/NNl2yAg==; _ga=GA1.2.942536903.1529303464; _ym_uid=1529303465616104447; __utmc=241422353; scs=%7B%22t%22%3A1%7D; sbjs_migrations=1418474375998%3D1; sbjs_first_add=fd%3D2018-06-18%2011%3A31%3A05%7C%7C%7Cep%3Dhttp%3A%2F%2Fwww.banki.ru%2F%7C%7C%7Crf%3D%28none%29; sbjs_first=typ%3Dtypein%7C%7C%7Csrc%3D%28direct%29%7C%7C%7Cmdm%3D%28none%29%7C%7C%7Ccmp%3D%28none%29%7C%7C%7Ccnt%3D%28none%29%7C%7C%7Ctrm%3D%28none%29; spUID=15293034654969ab066b49d.61173a51; aff_sub3=main; EmailSoldiers_WebTech=be38707e-94ba-4495-e0f8-e6c264403d1f; flocktory-uuid=177635d1-9dd3-4131-b0d3-91dc162f62b8-9; __utmz=241422353.1529305667.3.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); BANKI_RU_GUEST_ID=546389965; __auc=cd30884016417db223fac804fc3; _ym_d=1530007341; user-region-id=532; BANKI_RU_LAST_ADV=20012; _gid=GA1.2.1088851646.1530511570; _a_d3t6sf=duACZSOITjcs6mx35gwRj8S3; __io_lv=1530511695721; __io_uid_test=15; __io=822049517.14c6b162b_1530511695728; _io_un=; _io_un=; _io_un=2; __gads=ID=558a4874ffa1b28d:T=1530511695:S=ALNI_MbEI_JXK-ps1cjaLxmq7YRN7ubpSg; __utmv=241422353.|1=siteDesign=new=1; _ym_isad=2; decid_png=1125023275; decid_etag=1125023275; decid_cache=1125023275; DEC_ID=1125023275; BANKI_RU_DLDB=1135476647; sbjs_current_add=fd%3D2018-07-03%2018%3A25%3A44%7C%7C%7Cep%3Dhttp%3A%2F%2Fwww.banki.ru%2Fbanks%2Fbank%2Fbinbank%2Fbranches%2Fekaterinburg%2F6743251%2F%7C%7C%7Crf%3Dhttp%3A%2F%2Fwww.banki.ru%2Fbanks%2Fbank%2Fbinbank%2Fekaterinburg%2F; sbjs_current=typ%3Dreferral%7C%7C%7Csrc%3Dbanki.ru%7C%7C%7Cmdm%3Dreferral%7C%7C%7Ccmp%3D%28none%29%7C%7C%7Ccnt%3D%2Fbanks%2Fbank%2Fbinbank%2Fekaterinburg%2F%7C%7C%7Ctrm%3D%28none%29; bank_geo_link=#/!b1:960!s3:office!s4:list!m4:1!p1:1; _ym_visorc_502212=b; __utma=241422353.942536903.1529303464.1530627406.1530629651.23; _ic_c=23..google_organic; ins-gaSSId=03170e71-e3f2-6813-d65d-17d7dd0daa6d_1530633252; views_counter=%7B%22trades.banks.rshb%22%3A%5B532%5D%2C%22trades.banks.bystrobank%22%3A%5B532%5D%2C%22trades.banks.skb-bank%22%3A%5B532%5D%2C%22news%22%3A%5B3737027%5D%2C%22960%22%3A%5B532%5D%2C%228362%22%3A%5B532%5D%7D; current-currency=RUB; FullScreen2017=true; branding-wall_branding_wall=1; NonRobot=153063042704201893fc00c312e571948d30eecbd1992+9e617e9dd4d15ee0a6b8a71e2f0aee9d; __utmt=1; BANKI_RU_BANNERS=452_20055_2_04072018%2C453_6130_4_04072018%2C575_14919_4_04072018%2C1_6656_2_04072018%2C451_19969_4_04072018%2C106_10808_2_04072018%2C1_13352_3_04072018%2C585_22041_2_04072018%2C451_22462_1_04072018%2C452_13573_1_04072018%2C106_797_2_04072018%2C451_22612_5_04072018%2C451_22492_6_04072018%2C451_22126_7_04072018%2C1_6559_2_04072018%2C452_17223_1_04072018%2C585_22057_2_04072018%2C451_21954_2_04072018%2C451_21117_5_04072018%2C451_22496_1_04072018%2C106_10864_6_04072018%2C451_22290_1_04072018%2C451_18314_1_04072018%2C1_6841_2_04072018%2C585_22397_1_04072018%2C452_16005_1_04072018%2C451_21741_1_04072018%2C451_12138_1_04072018%2C452_21504_1_04072018%2C452_20063_1_04072018%2C451_22119_1_04072018%2C451_17312_1_04072018%2C451_21744_1_04072018%2C451_22117_1_04072018%2C1_7270_2_04072018%2C452_13777_2_04072018%2C452_20086_2_04072018%2C413_7471_1_04072018%2C451_21699_1_04072018%2C451_21587_1_04072018%2C451_22304_1_04072018%2C452_17661_1_04072018%2C452_22611_1_04072018%2C452_22517_1_04072018%2C452_22601_1_04072018%2C451_20803_1_04072018%2C106_807_1_04072018; _gat=1; __asc=28b440be16460afd52539d5ce21; sbjs_udata=vst%3D20%7C%7C%7Cuip%3D%28none%29%7C%7C%7Cuag%3DMozilla%2F5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F67.0.3396.87%20Safari%2F537.36; __utmb=241422353.33.8.1530630495019; sbjs_session=pgs%3D12%7C%7C%7Ccpg%3Dhttp%3A%2F%2Fwww.banki.ru%2F; BANKI_RU_LAST_VISIT=03.07.2018+18%3A08%3A42; lplastrequest=Tue Jul 03 2018 20:08:44 GMT+0500 (ÐÐºÐ°ÑÐµÑÐ¸Ð½Ð±ÑÑÐ³, ÑÑÐ°Ð½Ð´Ð°ÑÑÐ½Ð¾Ðµ Ð²ÑÐµÐ¼Ñ); insdrSV=106'
        }
    };

    browser.get(parseConf, (err, res) => {
        let parse = new Object();
        let success = new Array();
        if (!err && res.statusCode === 200) {
            let $ = new Object();
            $.mxe = cheer.load(res.body);
            parse.result = [];
            parse.result['bank'] = [];
            let locateRequest = [];
            for (let i = 0; i < $.mxe('.exchange-calculator-rates').length; i++) {
                // parsing [data exchange] concatinate
                parse.result['bank']['usd'] = [];
                parse.result['bank']['usd'].push({
                    buy: +$.mxe('.exchange-calculator-rates').eq(i).find('td').eq(1).data('currencies-rate-buy'),
                    sell: +$.mxe('.exchange-calculator-rates').eq(i).find('td').eq(2).data('currencies-rate-sell')
                });
                parse.result['bank']['eur'] = [];
                parse.result['bank']['eur'].push({
                    buy: +$.mxe('.exchange-calculator-rates').eq(i).find('td').eq(4).data('currencies-rate-buy'),
                    sell: +$.mxe('.exchange-calculator-rates').eq(i).find('td').eq(5).data('currencies-rate-sell')
                });
                // parsing [bank] concatinate
                parse.result['bank'].push({
                    name: $.mxe('.exchange-calculator-rates').eq(i).find('a').text(),
                    usd: parse.result['bank']['usd'],
                    eur: parse.result['bank']['eur'],
                    refresh: $.mxe('.exchange-calculator-rates').eq(i).find('td').eq(6).find('span').text()
                });

                // data for banks locations
                // bank page url mutation
                let locateURL = $.mxe('.exchange-calculator-rates').eq(i).find('a').attr('href').split('/products/currency/');
                locateURL = locateURL[1].split('/#bank-rates');
                locateURL = locateURL[0].split('/usd');
                locateURL = 'http://www.banki.ru/banks/' + locateURL.join('');
                ////console.log(locateURL);

                locateRequest.push({
                    url: locateURL,
                    bankName: parse.result['bank'][i].name
                });

            };

            // banks rates data test
            for (let i = 0; i < $.mxe('.exchange-calculator-rates').length; i++) {
                if (
                    typeof(parse.result['bank'][i].name) === 'string' &&
                    /\d\d\.\d\d|\d{2}|\d{1}/.test(parse.result['bank'][i].usd[0].buy) &&
                    /\d\d\.\d\d|\d{2}|\d{1}/.test(parse.result['bank'][i].usd[0].sell) &&
                    /\d\d\.\d\d|\d{2}|\d{1}/.test(parse.result['bank'][i].eur[0].buy) &&
                    /\d\d\.\d\d|\d{2}|\d{1}/.test(parse.result['bank'][i].eur[0].sell)
                ) {
                    success.push(true)
                } else {
                    success.push(false)
                }
            }

            if (success.indexOf(false) === -1) {
                // parsing final concatinate
                parse.result.push({
                    cityId: +cityId,
                    refresh: Math.round(Date.now() / 1000),
                    bank: parse.result['bank']
                });
                if (!update) {
                    resolve(parse.result);
                } else {
                    resolve(parse.result['bank']);
                }
                
                // checking banks info
                let iBNK = 0;
                let callBankInfo = () => {
                    if (iBNK === locateRequest.length - 1) {
                        //if (iBNK === 1) {
                        clearInterval(startBankInfo);
                    }
                    getBankScraping(locateRequest[iBNK].url, cityId, locateRequest[iBNK].bankName, db)
                        .then(
                            res => {
                                //console.log(res);
                                if (iBNK === locateRequest.length) {
                                    //console.log(`START BANKS DIRECTIONS CHECKING`);
                                    setBanksDirections(cityId, db);
                                }
                            }
                        );
                    iBNK++;
                }
                // bank cheking ticker of 7459 milliseconds
                let startBankInfo = setInterval(callBankInfo, 7459);
                startBankInfo;
            } else {
                const err = `Ошибка парсинга котировок банков в городе ${cityId}`;
                sendError(err);
                reject('CACHE');
            }

        }
    });

});
// scraping banks-rates end

const setDirection = async (term, branch, token, db, ticker) => {
    let directions = new Object();
    directions.col = db.client.collection("module.money-exchange.directions");
    directions.query = { 'termId': +term.termId, 'branch': `${branch.lon},${branch.lat}` };
    try {
        let directionURL = `https://api.mapbox.com/directions/v5/mapbox/driving/${term.lon},${term.lat};${branch.lon},${branch.lat}?language=ru&access_token=${token}`;
        browser.get(directionURL, (err, res) => {
            if (!err && res.statusCode === 200) {
                let write = new Object();
                let MapBoxAnswer = JSON.parse(res.body);
                write.termId = term.termId;
                write.branch = `${branch.lon},${branch.lat}`;
                write.routes = MapBoxAnswer.routes;
                write.cityId = term.cityId;
                setUpdateOne(directions.col, directions.query, write);
            }
        });
        return ticker;
    } catch (err) {
        return `MapBox api error ${err}`;
    }
}

// scraping matrix of MapBox API begin
const setBanksDirections = async (cityId, db) => {

    //console.log(`init MapBox API connector`);
    const MAPBOXTOKEN = `REMOVED`;

    let dbo = new Object();

    dbo.directions = new Object();
    dbo.directions.col = db.client.collection("module.money-exchange.directions");
    dbo.directions.query = { 'cityId': +cityId };
    dbo.directions.answer = await dbFind(dbo.directions.col, dbo.directions.query);

    if (dbo.directions.answer.length === 0) {

        // в данный момент в функции отсутствует проверка наличия
        // маршрутов для конкретного терминала
        // её необходимо реализовать для целостности базы
        // маршруты для новых терминалов требуют обновления всей базы
        // что предельно нерационально (скажем даже иррационально)

        dbo.term = new Object();
        dbo.term.answer = await getCityTerminals(cityId);

        dbo.branches = new Object();
        dbo.branches.col = db.client.collection("module.money-exchange.branches");
        dbo.branches.query = { 'cityId': { $eq: +cityId } };
        dbo.branches.answer = await dbFind(dbo.branches.col, dbo.branches.query);

        //console.log(`terminals count ${dbo.term.answer.length - 1}`);
        //console.log(`branches count ${dbo.branches.answer.length - 1}`);
        //console.log(`start directions scraping of MapBox Directions API, from ${(dbo.term.answer.length - 1) * (dbo.branches.answer.length - 1)} calls`);

        // checking banks info
        let iDIR = 0; // global city ways ticker
        let iTERM = 0; // terminal ticker
        let iBRA = 0; // branch ticker
        let callSetDirection = () => {
            if (iDIR === (dbo.term.answer.length - 1) * (dbo.branches.answer.length - 1)) {
                clearInterval(startSetDirection);
            }
            setDirection(dbo.term.answer[iTERM], dbo.branches.answer[iBRA], MAPBOXTOKEN, db, iDIR)
                .then(
                    res => {
                        //console.log(`success tick ${res} of ${(dbo.term.answer.length - 1) * (dbo.branches.answer.length - 1)}, branch ${iBRA}, terminal ${iTERM}`);
                    }
                );
            iDIR++;
            if (iBRA <= (dbo.branches.answer.length - 2)) {
                iBRA++;
            } else {
                iBRA = 0;
                iTERM++;
            }
        }
        // bank cheking ticker of 7459 milliseconds
        let startSetDirection = setInterval(callSetDirection, 1010);
        startSetDirection;

    } else {
        //console.log(`city ${cityId} directions checked success`);
    }
}
// scraping matrix of MapBox API end

// module api begin
// getRates / Возвращает котировки всех банков, привязанных 
//            к городу, к которому привязан терминал,
//            переданный в качестве параметра (termId (int)).
//            Если требуется, обновляет данные котировок.
//            Отправляет запрос на проверку актуальности
//            информации о банках.
const getBanks = async termId => {
    let scrape = undefined;
    let db = await getBase();
    let dbo = new Object();
    let banks = undefined;
    let banksCache = undefined;
    let branchesCache = undefined;
    let ratesCache = undefined;
    let ratesCacheLib = undefined;
    let directionsCache = undefined;
    let directionsCacheLib = undefined;

    dbo.term = new Object();
    // dbo.term.col = db.client.collection("terminals");
    // dbo.term.query = { 'termId': { $eq: +termId } };
    dbo.term.answer = await getOneTerminal(termId);

    dbo.rates = new Object();
    dbo.rates.col = db.client.collection("module.money-exchange.rates");
    dbo.rates.query = { 'cityId': { $eq: +dbo.term.answer.cityId } };
    dbo.rates.answer = await getOne(dbo.rates.col, dbo.rates.query);

    dbo.branches = new Object();
    dbo.branches.col = db.client.collection("module.money-exchange.branches");
    dbo.branches.query = { 'cityId': { $eq: +dbo.term.answer.cityId } };
    dbo.branches.answer = await dbFind(dbo.branches.col, dbo.branches.query);

    dbo.directions = new Object();
    dbo.directions.col = db.client.collection("module.money-exchange.directions");
    dbo.directions.query = { 'termId': { $eq: +termId } };
    dbo.directions.answer = await dbFind(dbo.directions.col, dbo.directions.query);

    dbo.source = new Object();
    dbo.source.col = db.client.collection("module.money-exchange.sources");
    dbo.source.query = { 'cityId': { $eq: +dbo.term.answer.cityId } };
    dbo.source.answer = await getOne(dbo.source.col, dbo.source.query);

    if (dbo.rates.answer === null) {
        scrape = await getRatesScraping(dbo.source.answer.url, +dbo.term.answer.cityId, false, db);
        dbo.rates.col.insert(scrape);
        ratesCache = scrape;
        //return scrape;
    } else if (Math.abs(dbo.rates.answer.refresh - Math.round((Date.now() / 1000))) > 7200) {

        await getRatesScraping(dbo.source.answer.url, +dbo.term.answer.cityId, true, db).then(res => {
            scrape = res;
        }).catch(err => {
            scrape = err;
        })

        if (scrape !== 'CACHE') {
            let upData = {
                'cityId': +dbo.term.answer.cityId,
                'refresh': Math.round(Date.now() / 1000),
                'bank': scrape
            };
            dbo.rates.answer = await getOneAndUpdate(dbo.rates.col, dbo.rates.query, upData);
        }

        ratesCache = dbo.rates.answer;
    }

    //return dbo.rates.answer;

    branchesCache = dbo.branches.answer;
    ratesCache = dbo.rates.answer.bank;
    directionsCache = dbo.directions.answer;
    ratesCacheLib = new Object();
    directionsCacheLib = new Object();

    Object.keys(ratesCache).map(i => {
        ratesCacheLib[ratesCache[i].name] = ratesCache[i];
    });
    Object.keys(directionsCache).map(i => {
        let directionCroppBuffer = new Object();
        directionCroppBuffer.distance = directionsCache[i].routes[0].distance / 1000;
        directionCroppBuffer.distance = directionCroppBuffer.distance.toFixed(2);
        directionCroppBuffer.duration = directionsCache[i].routes[0].duration / 60;
        directionCroppBuffer.duration = directionCroppBuffer.duration.toFixed(0);
        directionsCacheLib[directionsCache[i].branch] = directionCroppBuffer;
    });

    banksCache = branchesCache.map(branch => {
        let extendBranch;
        let directionBranch;
        if (ratesCacheLib[branch.bank] !== undefined) {
            extendBranch = Object.assign({}, ratesCacheLib[branch.bank], branch);
            directionBranch = Object.assign({}, directionsCacheLib[`${branch.lon},${branch.lat}`], extendBranch);
            return directionBranch;
        } else {
            return undefined;
        }
    });
    banks = banksCache.filter(bank => bank !== undefined);
    return banks;
}

// exAPI /  Обращается к внешним API, возвращает результат как есть
const exAPI = url => {
    return new Promise ((resolve, reject) => {
        browser.get(url, (err, res) => {
            if (!err && res.statusCode === 200) {
                resolve(res.body);
            } else {
                reject(`Extend API error ${err}`);
            }
        });
    });
}

// getCityTerminals /  Возвращает список активных терминалов в переданном в качестве аргумента городе
const getCityTerminals = async cityId => {

    let timiAPI = `http://api.timilink.ru/terminal?per-page=9999&info_only=1&status=1`;

    let buffer = await exAPI(timiAPI);
        buffer = JSON.parse(buffer);
        buffer = Object.entries(buffer);

    let terms = [];

    Object.keys(buffer).map(i => {
        if (buffer[i][1].id_city === +cityId) {
            let one = {
                termId: +buffer[i][1].id_terminal,
                cityId: +buffer[i][1].id_city,
                lat: +buffer[i][1].coordinates.match(/\d\d\.\d*/gm)[0],
                lon: +buffer[i][1].coordinates.match(/\d\d\.\d*/gm)[1],
            }
            terms.push(one);
        }
    });

    return terms;

}

// getOneTerminal /  Возвращает информацию о терминале
const getOneTerminal = async termId => {
    
    let timiAPI = `http://api.timilink.ru/terminal/${termId}?&info_only=1`;
    
    let buffer = await exAPI(timiAPI);
        buffer = JSON.parse(buffer);

    let term = {
        termId: +buffer.id_terminal,
        cityId: +buffer.id_city,
        lat: buffer.coordinates.match(/\d\d\.\d*/gm)[0].replace('\'', ''),
        lon: buffer.coordinates.match(/\d\d\.\d*/gm)[1].replace('\'', ''),
    }

    return term;

}
// getRoute    / Возвращает из базы или кэширует набор отрезков - маршрута от
//               от терминала до филиала банка.
const getRoute = async (termId, destination) => {
    let db = await getBase();

    directions = new Object();
    directions.col = db.client.collection("module.money-exchange.directions");
    directions.query = { 'termId': +termId, 'branch': destination };
    directions.answer = await dbFind(directions.col, directions.query);

    let geometry = directions.answer[0].routes[0].geometry;

    return geometry;
}
// getDistance / Возвращает расстояние от терминала до филиала банка.
//               Если расстояние отсутствует в нашей базе, пробуем обновить.
//               Для расчета расстояния используются данные маршрута, полученные
//               и закэшированные с помощью getRoute.
const getDistance = async (termId, branchCoord) => {
    //console.log(termId, branchCoord);
}
// module api end

module.exports = { getBanks, getOneTerminal, getCityTerminals, getDistance, getRoute }
