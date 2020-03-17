import React from 'react';

function Food( { name }){
  return <h1>i like {name}</h1>;
}

const foodILike = [
  {
    name: "kimchi",
    image: "https://www.google.com/search?q=%EA%B3%A0%EC%96%91%EC%9D%B4&newwindow=1&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj8yqy3iMvnAhUUMd4KHfOnCKYQ_AUoAXoECAwQAw&biw=1920&bih=937#imgrc=PVr3orNM3dWlYM"
  },
  {
    name: "samgyeopsal",
    image:"https://www.google.com/search?q=%EA%B3%A0%EC%96%91%EC%9D%B4&newwindow=1&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj8yqy3iMvnAhUUMd4KHfOnCKYQ_AUoAXoECAwQAw&biw=1920&bih=937#imgrc=NpMi5nVF1QK1MM"
  },
  {
    name: "bibimbap",
    image:"https://www.google.com/search?q=%EA%B3%A0%EC%96%91%EC%9D%B4&newwindow=1&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj8yqy3iMvnAhUUMd4KHfOnCKYQ_AUoAXoECAwQAw&biw=1920&bih=937#imgrc=KEfDBArgIcjBaM"
  },
  {
    name: "cat",
    image:"https://www.google.com/search?q=%EA%B3%A0%EC%96%91%EC%9D%B4&newwindow=1&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj8yqy3iMvnAhUUMd4KHfOnCKYQ_AUoAXoECAwQAw&biw=1920&bih=937#imgrc=KnsdcchfpEpaHM"
  },
  {
    name: "yaongg",
    image:"https://www.google.com/search?q=%EA%B3%A0%EC%96%91%EC%9D%B4&newwindow=1&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj8yqy3iMvnAhUUMd4KHfOnCKYQ_AUoAXoECAwQAw&biw=1920&bih=937#imgrc=mXFIhmkXOdWANM"
  }
];

function App() {
  return (
    <div>
      <h1>Hello</h1> 
      {foodILike.map(dish => (
        <food name={dish.name} />
      ))}
    </div>
    )
    
}

export default App;
