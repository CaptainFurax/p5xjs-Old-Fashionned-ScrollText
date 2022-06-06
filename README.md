# p5xjs-Old-Fashionned-ScrollText

![OldFashionned-ScrollText](https://github.com/CaptainFurax/p5xjs-Old-Fashionned-ScrollText/blob/main/CPT2206061846-640x480-3.png)

+ Today, playing with an Old Fx : An ASCII-Ordered Scrolltext over a Bitmap :)
  + [.oO° Online Demo °Oo.](https://captainfurax.github.io/p5xjs-Old-Fashionned-ScrollText/)
  + Specs : 
    + Ordered your bitmap font in ASCII Code...order !
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
+ Tricks :
  + using image + get functions is x2.5 faster with buffered(logical screen - which is not true with physical screen) :
```javascript
blocks[i][j].image( fnt.get((snts[i].charCodeAt(j)-32)*64, 0, 64, 64), 0, 0, 64, 64 );
```
  + than "copy" function :
```javascript
blocks[i][j].copy( fnt, (snts[i].charCodeAt(j)-32)*64, 0, 64, 64, 0, 0, 64, 64 );
```
