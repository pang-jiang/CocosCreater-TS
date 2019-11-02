
interface AjaxConfig {
    type: string,
    url: string,
    data?: string,
    dataType: string
}

export abstract class TsAjax {
    abstract _get(url:string, data?:string):any;
    abstract _post(url:string, data?:string):any
}

export class Ajax extends TsAjax {
     private doAjax(config: AjaxConfig):any {
        let result: any = "";
        let xhr = new XMLHttpRequest();
 
        if (xhr != null) {
            xhr.open(config.type, config.url, true);
            xhr.send(config.data);
            xhr.onreadystatechange = function () {
                console.log(xhr.statusText);
                let data = xhr.responseText;
                if (xhr.readyState == 4 && xhr.status == 200) {
                    if (config.dataType == 'json') {
                        result = JSON.parse(data);
                    } else {
                        result = data;
                    }
                } else { 
                    result = data; 
                }
            }
        } else { 
            result = "Your browser does not support XMLHTTP.";
        }
        console.log(result);
        return result;
    }
 
    _post(url: string, data?:string): any { 
        return this.doAjax({
            type:'post',
            data:data,
            url:url,
            dataType:'json'
        });
    }
 
    _get(url: string, data?:string): any { 
        return this.doAjax({
            type:'get',
            data:data,
            url:url, 
            dataType:'json'
        });
    }
}