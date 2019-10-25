window.onload = ()=>{
  const overlay = document.getElementsByClassName('overlay')
  let overlay_array = Array.from(overlay)

  overlay_array.forEach((element) =>{
    element.addEventListener('mouseover', (e)=>{
      e.target.firstElementChild.style.display = 'block';
    });
    
    element.addEventListener('mouseleave', (e)=>{
      e.target.firstElementChild.style.display = 'none';
    });
  })
  
  
}


