# p5xjs-Old-Fashionned-ScrollText

![OldFashionned-ScrollText](https://github.com/CaptainFurax/p5xjs-Old-Fashionned-ScrollText/blob/main/CPT2206061934-1151x863.png)

+ Today, playing with an Old Fx : An ASCII-Ordered Scrolltext built over a Bitmap :)
  + [.oO° Online Demo °Oo.](https://captainfurax.github.io/p5xjs-Old-Fashionned-ScrollText/)
  + Specs : 
    + 2D Canvas, very smooth and fast at only 50fps with a 64x64px character font. 
    + Organize your bitmap font by ASCII Code...order !
    + Copy your chr indexed by their code, sub 32 [ first chr == space ] and mult by by the width [ here , 64px ]  
```javascript
  for ( i = 0; i < snts.length; i++ ) { 
    //snts[i] = snts[i].toUpperCase();
    for ( j = 0; j < snts[i].length; j++ ) {
      blocks[i].push( createGraphics(64,64) );
      blocks[i][j].image( fnt.get((snts[i].charCodeAt(j)-32)*64, 0, 64, 64),0, 0, 64, 64 );
    }
  }
```
+ After, i just play with pixels blending :
  + to create a 'neon' fx on rasters (ADD)
  + and color the characters( a bigger raster with 'HARD_LIGHT' blending over them )
  + sliding the Masked-Rasters bitmap used in background with a shifted offset, allow you to very simply change the characters colors at each sentences
+ Tricks :
  + using combination of image() + get() functions is x2.5 faster with buffered(logical screen) - which is not true with physical screen :
```javascript
// is better 
blocks[i][j].image( fnt.get((snts[i].charCodeAt(j)-32)*64, 0, 64, 64), 0, 0, 64, 64 );
// than "copy" function :
blocks[i][j].copy( fnt, (snts[i].charCodeAt(j)-32)*64, 0, 64, 64, 0, 0, 64, 64 );
```
