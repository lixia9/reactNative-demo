var cp = require('child_process')
var fs = require('fs');
var stat = fs.stat;
var EasyZip = require('easy-zip2').EasyZip;
var path = require('path');
var chalk = require('chalk');
var appRnVersion = require("./app-rn-version-config");
let iosbuildoutPath = path.join(__dirname, "./dist/iosbuildout");
let androidbuildoutPath = path.join(__dirname, "./dist/androidbuildout")

// var copy=function(src,dst){
//     //读取目录
//     fs.readdir(src,function(err,paths){
//         console.log(paths)
//         if(err){
//             throw err;
//         }
//         paths.forEach(function(path){
//             var _src=src+'/'+path;
//             var _dst=dst+'/'+path;
//             var readable;
//             var writable;
//             stat(_src,function(err,st){
//                 if(err){
//                     throw err;
//                 }

//                 if(st.isFile()){
//                     readable=fs.createReadStream(_src);//创建读取流
//                     writable=fs.createWriteStream(_dst);//创建写入流
//                     readable.pipe(writable);
//                 }else if(st.isDirectory()){
//                     exists(_src,_dst,copy);
//                 }
//             });
//         });
//     });
// }

// var exists=function(src,dst,callback){
//     //测试某个路径下文件是否存在
//     fs.exists(dst,function(exists){
//         if(exists){//不存在
//             callback(src,dst);
//         }else{//存在
//             fs.mkdir(dst,function(){//创建目录
//                 callback(src,dst)
//             })
//         }
//     })
// }


//使用时第二个参数可以忽略
function mkdir(dirpath, dirname) {
    //判断是否是第一次调用
    if (typeof dirname === "undefined") {
        if (fs.existsSync(dirpath)) {
            return;
        } else {
            mkdir(dirpath, path.dirname(dirpath));
        }
    } else {
        //判断第二个参数是否正常，避免调用时传入错误参数
        if (dirname !== path.dirname(dirpath)) {
            mkdir(dirpath);
            return;
        }
        if (fs.existsSync(dirname)) {
            fs.mkdirSync(dirpath)
        } else {
            mkdir(dirname, path.dirname(dirname));
            fs.mkdirSync(dirpath);
        }
    }
}

process.env.NODE_ENV = 'production'
mkdir(`./android/android-rn-${appRnVersion.currentRnVersion}`)
mkdir(`./ios/ios-rn-${appRnVersion.currentRnVersion}`)
mkdir("./dist/iosbuildout/rn")
mkdir("./dist/androidbuildout/rn")
Object.keys(appRnVersion).forEach(item => {
    switch (item) {
        case "ios":
            Object.keys(appRnVersion.ios).forEach(_item => {
                mkdir(`./dist/iosbuildout/${_item}`)
            })
            break;
        case "android":
            Object.keys(appRnVersion.android).forEach(_item => {
                mkdir(`./dist/androidbuildout/${_item}`)
            })
            break;
    }

})
var diff = cp.exec('ls -l ./bsdiff', {})
diff.stdout.on('data', function (data) {
    console.log(chalk.yellow('bsdiff: ') + data.split(" ")[0])
    if (data.split(" ")[0] !== " -rwxrwxrwx") {
        cp.exec('sudo chmod 777 ./bsdiff', {})
    }
})
diff.stderr.on('data', function (data) {
    console.log(chalk.red('bsdiff: ' + data))
})
diff.on('close', (code) => {



    // 
    var workerProcessIOS = cp.exec(`react-native bundle --entry-file index.js --bundle-output ./ios/ios-rn-${appRnVersion.currentRnVersion}/index.ios.jsbundle —platform ios --assets-dest ./ios/ios-rn-${appRnVersion.currentRnVersion} --dev false`, {})

    workerProcessIOS.stdout.on('data', function (data) {
        console.log(chalk.yellow('IOS: ') + data)
    })

    workerProcessIOS.stderr.on('data', function (data) {
        console.log(chalk.red('IOS: ' + data))
    })
    workerProcessIOS.on('close', (code) => {

        var workerProcessAndroid = cp.exec(`react-native   bundle  --platform android  --verbose --minify false --dev false  --entry-file index.js  --bundle-output ./android/android-rn-${appRnVersion.currentRnVersion}/index.android.bundle --assets-dest  ./android/android-rn-${appRnVersion.currentRnVersion}`, {})
        workerProcessAndroid.stdout.on('data', function (data) {
            console.log(chalk.yellow('Android: ') + data)
        })

        workerProcessAndroid.stderr.on('data', function (data) {
            console.log(chalk.red('Android: ' + data))
        })
        workerProcessAndroid.on('close', (code) => {
            console.log(chalk.green("ios 打包完毕"));
            console.log(chalk.green("Android 打包完毕"));
            zip();
        });
    });
});
function copyfile(src, dir) {
    fs.writeFileSync(dir, fs.readFileSync(src));
}

function zip() {
    console.log(chalk.yellow("android  开始压缩"));
    var optionsIos = { dir: iosbuildoutPath + "/rn/", name: `ios-rn-${appRnVersion.currentRnVersion}.zip`, filter: "" }
    var optionsAndroid = { dir: androidbuildoutPath + "/rn/", name: `android-rn-${appRnVersion.currentRnVersion}.zip`, filter: "" }
    const IOSDIR = path.join(__dirname, `./ios/ios-rn-${appRnVersion.currentRnVersion}`);
    const ANDROIDDIR = path.join(__dirname, `./android/android-rn-${appRnVersion.currentRnVersion}`);
    //nodeJsZip.zip(IOSDIR, optionsIos);

    var zipAndroid = new EasyZip();
    zipAndroid.zipFolder(ANDROIDDIR, function () {
        zipAndroid.writeToFile(optionsAndroid.dir + optionsAndroid.name);
        zipAndroid.writeToFile(optionsAndroid.dir + "androidBaseRn.zip");
        console.log(chalk.green("android 压缩完毕"));
        console.log(chalk.yellow("ios  开始压缩"));
        var zipIos = new EasyZip();
        zipIos.zipFolder(IOSDIR,  ()=> {
            zipIos.writeToFile(optionsIos.dir + optionsIos.name);
            zipIos.writeToFile(optionsIos.dir + "iosBaseRn.zip");
            console.log(chalk.green("ios 压缩完毕"));
            console.log(chalk.yellow("开始拷贝文件"));
           setTimeout(() => {
            if (appRnVersion.currentRnVersion === appRnVersion.ios[appRnVersion.currentIosAppVersion]) {
                copyfile(iosbuildoutPath + "/rn/ios-rn-" + appRnVersion.currentRnVersion + ".zip", iosbuildoutPath + "/" + appRnVersion.currentIosAppVersion + "/ios-rn-" + appRnVersion.currentRnVersion + ".zip")
            }
            if (appRnVersion.currentRnVersion === appRnVersion.android[appRnVersion.currentAndroidAppVersion]) {
                copyfile(androidbuildoutPath + "/rn/android-rn-" + appRnVersion.currentRnVersion + ".zip", androidbuildoutPath + "/" + appRnVersion.currentAndroidAppVersion + "/android-rn-" + appRnVersion.currentRnVersion + ".zip")
            }
            console.log(chalk.green("拷贝文件结束"));
            md5();
            diffpacth()  
           }, 3000);
        },()=>{
            console.log("asdasdads")
        });
    });

}

function diffpacth() {
    Object.keys(appRnVersion).forEach(item => {
        switch (item) {
            case "ios":
                Object.keys(appRnVersion.ios).forEach(_item => {
                    difIOS(_item)
                })
                break;
            case "android":
                Object.keys(appRnVersion.android).forEach(_item => {
                    difAndorid(_item)
                })
                break;
            default:

                break;
        }

    })



}


function deleteall(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                //deleteall(curPath);
            } else { // delete file

                if (curPath.indexOf("patch") > -1) {
                    fs.unlinkSync(curPath);
                }
                //
            }
        });

    }
};

function difIOS(key) {
    deleteall(iosbuildoutPath + "/" + appRnVersion.currentIosAppVersion + "/")
    if (key !== appRnVersion.currentIosAppVersion || appRnVersion.currentRnVersion !== appRnVersion.ios[key]) {
        var workerProcessIOS = cp.exec('./bsdiff ' + iosbuildoutPath + "/" + key + "/ios-rn-"
            + appRnVersion.ios[key] + ".zip " + iosbuildoutPath + "/rn/" + "ios-rn-" + appRnVersion.currentRnVersion + ".zip  " + iosbuildoutPath + "/" + appRnVersion.currentIosAppVersion + "/" + key + "-rn"
            + appRnVersion.ios[key] + "-rn" + appRnVersion.currentRnVersion + ".zip", {})

        workerProcessIOS.stdout.on('data', function (data) {
            console.log(chalk.yellow('IOS: ') + data)
        })

        workerProcessIOS.stderr.on('data', function (data) {
            console.log(chalk.red('IOS: ' + data))
        })
        workerProcessIOS.on('close', (code) => {
            console.log(chalk.green('IOS: app版本号：' + key + "，该版本RN的基础版本号:" + appRnVersion.ios[key] + "，最新的RN版本号：" + appRnVersion.currentRnVersion + "，diff完毕"))
        })
    } else {

    }


}

function difAndorid(key) {
    deleteall(androidbuildoutPath + "/" + appRnVersion.currentAndroidAppVersion + "/")
    if (key !== appRnVersion.currentAndroidAppVersion || appRnVersion.currentRnVersion !== appRnVersion.android[key]) {
        var workerProcessAndriod = cp.exec('./bsdiff ' + androidbuildoutPath + "/" + key + "/android-rn-" + appRnVersion.android[key] + ".zip "
            + androidbuildoutPath + "/rn/" + "android-rn-" + appRnVersion.currentRnVersion + ".zip  "
            + androidbuildoutPath + "/" + appRnVersion.currentAndroidAppVersion + "/" + key + "-rn" + appRnVersion.android[key] + "-rn" + appRnVersion.currentRnVersion + ".zip", {})

        workerProcessAndriod.stdout.on('data', function (data) {
            console.log(chalk.yellow('Andriod: ') + data)
        })

        workerProcessAndriod.stderr.on('data', function (data) {
            console.log(chalk.red('Andriod: ' + data))
        })
        workerProcessAndriod.on('close', (code) => {
            console.log(chalk.green('Andriod: app版本号：' + key + "，该版本RN的基础版本号:" + appRnVersion.ios[key] + "，最新的RN版本号：" + appRnVersion.currentRnVersion + "，diff完毕"))

        })
    } else {


    }


}
function md5() {
    var androidMd5 = cp.exec(`md5 ${androidbuildoutPath}/rn/android-rn-${appRnVersion.currentRnVersion}.zip`)
    androidMd5.stdout.on('data', function (data) {
        console.log(chalk.yellow(`Andriod最新版本: android-rn-${appRnVersion.currentRnVersion} MD5 值为 ：`) + chalk.red(data.split("=")[1]))
    })
    var iosMd5 = cp.exec(`md5 ${iosbuildoutPath}/rn/ios-rn-${appRnVersion.currentRnVersion}.zip`)
    iosMd5.stdout.on('data', function (data) {
        console.log(chalk.yellow(`IOS最新版本: ios-rn-${appRnVersion.currentRnVersion} MD5 值为 ：`) + chalk.red(data.split("=")[1]))
    })
}
