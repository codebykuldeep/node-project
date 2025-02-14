interface CacheType{
    [index:string]:string;
}

function cacheStore(){
    const cache:CacheType={};
    return {
        set:(key:string,value:any) =>{
            key = key.toLowerCase();
            const storeValue = JSON.stringify(value);
            cache[key] = storeValue;
        },
        get:(key:string)=>{
            key = key.toLowerCase();
            if(!cache[key]){
                return undefined;
            }
            const value = JSON.parse(cache[key]);
            return value;
        },
        check:(key:string)=>{
            key = key.toLowerCase();
            if(!cache[key]){
                return false;
            }
            return true;
        }
    }
}

export default cacheStore()