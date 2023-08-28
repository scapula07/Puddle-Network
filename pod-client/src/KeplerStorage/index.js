import { SSX } from "@spruceid/ssx";

const ssx = new SSX({
    modules: {
      storage: {
        prefix: '',
        hosts: ['https://kepler.spruceid.xyz'],
        autoCreateNewOrbit: true,
      },
      providers: { 
        web3: { 
            driver: window.ethereum 
        }
    }
    }
  });
export const keplerStorage= {
 getContentList: async () => {
    
    let { data } = await SSX.storage.list();
    data = data.filter((d) => d.includes('/content/'))
    console.log(data)

    return data
    
  },


  handlePostContent :async (key, value) => {
    if (!key || !value) {
      alert('Invalid key or value');
      return;
    }
    const formatedKey = 'content/' + key.replace(/\ /g, '_');
 
    const response=  await ssx.storage.put(formatedKey, value);
    console.log(response)
 
  },


   handleGetContent : async (content) => {
    
    const contentName = content.replace('my-app/', '')
    const { data } = await  SSX.storage.get(contentName);
    console.log(data)
    return data
  },


   handleDeleteContent :async (content) => {
   
    const contentName = content.replace('my-app/', '')
    const response= await SSX.storage.delete(contentName);
    console.log(response,"delet")
   
  },
  hostOorbit:async()=>{
    const orbit = await ssx.storage.hostOrbit();
    console.log(orbit)
    return orbit

  }
}