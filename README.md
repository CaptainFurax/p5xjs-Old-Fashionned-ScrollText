# p5xjs-Old-Fashionned-ScrollText

![OldFashionned-ScrollText](https://github.com/CaptainFurax/p5xjs-Old-Fashionned-ScrollText/blob/main/CPT2206061846-640x480-3.png)

+ Today, playing with an Old Fx : An ASCII-Ordered Scrolltext over a Bitmap :)
  + [.oO° Online Demo °Oo.](https://captainfurax.github.io/p5xjs-Old-Fashionned-ScrollText/)
  + Specs : 
    + Ordered your bitmap font in ASCII Code...order !
    +   ```javascript
  rollUpd() {
    // remove tail element and place it to head with a single line of code !
    this.body.push( this.body.shift() )
    // copying prev. head coords to new one
    if ( this.body.length > 1 ) this.body[ this.body.length-1 ] = this.body[ this.body.length-2 ].copy()
    // adding the direction to the head
    this.getHead().add( vDir )
  }
