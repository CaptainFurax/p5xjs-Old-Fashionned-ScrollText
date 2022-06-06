p5.disableFriendlyErrors = true;
preload=_=> { fnt = loadImage("rsc/font-ascii_64x64.png"); }
let cvSiz;
//
setup=_=> {
  pixelDensity(1);
  frameRate(50);
  angleMode(DEGREES);
  cvSiz = createVector(640,480);
  createCanvas(cvSiz.x, cvSiz.y).id("mainCanvas");
  //
  ix = 656; sino = fade = 0; p = -1;
  //
  rasters = []; t = [];
  f = [false, false, false];
  Pal = [ [0,6,0], [0,0,6], [6,0,0], [6,6,0], [6,0,6], [0,6,6] ];
  buffers = [ createGraphics(640,480), createGraphics(640,480) ];
  snts = [
    "Hi Folks !",
    "Here's Captn'Furax @ Keyboard",
    "Today, Playing With Scrolltexts And P5.JS !",
    "For...",
    "...'Old School Toujours Tiny Screen' !!! *** Yeah Baby ! ***",
    "So : P5.JS x OldSkool",
    "With A Good Old Fashionned ASCII-Ordered Scrolltext...",
    "...Over a Bitmap Font : An Fx named 'Ethereal ScrollText'",
    "With Remastered Rasters named 'Neon Rasters' :-)",
    "Because, You know What ?",
    "It's 2022 & Atari Still Rulezzzzzz Your Screen !",
    "*** Let's Wrap ! ***"
  ];
  /* La bande a Rasters et leur Calque */
  for ( j=0; j < 6; j++ ) {
    rasters[j] = createGraphics(640,80);
    rasters[j].background(0);
    rasters[j].strokeWeight( 1 );
    for ( i=0; i < 40; i++ ) {
      rasters[j].stroke([Pal[j][0]*(2+i), Pal[j][1]*(2+i), Pal[j][2]*(2+i)], 255);
      rasters[j].line( 0, i, 640, i);
      rasters[j].line( 0, 79-i, 640, 79-i);
    }
  }
  //
  buffers[0].background(0);
  push();
    for ( i=0; i<6; i++ ) {
      buffers[0].image( rasters[i%6].get(0,0,640,80), 0, i*80, 640, 80 );
    }
  pop();
  /*
    Generation/fabrication des phrases du ScrollTxt
      -> On découpe les phrases du textes en sprites ou 1 caractere = 1 sprite.
    NB : 
      -> image + get : 
        x2.5 Faster -> blocks[i][j].image( fnt.get((snts[i].charCodeAt(j)-32)*64, 0, 64, 64), 0, 0, 64, 64 );
      -> than copy : 
        -> blocks[i][j].copy( fnt, (snts[i].charCodeAt(j)-32)*64, 0, 64, 64, 0, 0, 64, 64 );
    NB2 :
      x2.5 faster sur plrs petits blocks [ 64x64 ]
      Mais x100 faster sur 1 gros block [ 640x400 ]
    NB3 :
      -> !!! image + get -> plus rapide sur ecran logique [ buffer ] !!!
      -> sur ecran physique, il est plus lent et "accroche" /rapport à "copy"... 
  */
  blocks = Array.from( Array(snts.length), _=> Array() );
  for ( i = 0; i < snts.length; i++ ) { 
    //snts[i] = snts[i].toUpperCase();
    for ( j = 0; j < snts[i].length; j++ ) {
      blocks[i].push( createGraphics(64,64) );
      blocks[i][j].image( fnt.get((snts[i].charCodeAt(j)-32)*64, 0, 64, 64),0, 0, 64, 64 );
    }
  }
  windowResized();
  SwapMeIamFamous();
}
//
function draw() {
  background(0);
  // 'Neon' Rasters
  blendMode( ADD );
  push();
    for ( i = 0; i < 4; i++ )
    {
      sino = sin( frameCount + (i<<4) ) * 70;
      image(rasters[3+(i%3)],0,60 - sino,640,30);
      image(rasters[3+(i%3)],0,390 + sino,640,30);
    }
  pop();
  // Scroll Text
  for ( var i = 0; i < blocks[p].length; i++ ) { 
    image( blocks[p][i], ix + ( i<<6 ), 208 + sin( frameCount + (i*24) ) * 32, 64, 64 );
  }
  // 'Ethereal' Tube
  blendMode( HARD_LIGHT );
  push();
    if( fade != 255 ) tint(255,fade);
    image(buffers[0].get(0, 360, 640, 80), 0, 160, 640, 160 );
  pop();
  if ( ix < blocks[p].length * -64 )
  {
    f[0] = !f[0];
    (ix = 656);
  }

  if ( f[0] && fade < 5 )
  {
    f[0] = !f[0];
    SwapMeIamFamous();
  } else if ( !f[0] && fade > 250 ) ix -= 6;
  fade = (f[0]) ? Math.max( 0, fade-=2.5 ) : Math.min( 255, fade+=2.5 );
}
SwapMeIamFamous=_=>
{
  (p=(++p)%blocks.length);
  buffers[1].image( buffers[0].get(0, 400, 640, 80), 0, 0, 640, 80 );
  buffers[1].image( buffers[0].get(0,0,640,400), 0, 80, 640, 400 );
  buffers[0,1] = buffers[1,0];
}

windowResized=_=>{
  let ratio  = createVector( windowWidth / cvSiz.x, windowHeight / cvSiz.y );
  if ( windowWidth > windowHeight && ratio.x > ratio.y )
  {
    select("#mainCanvas").style("width", round(cvSiz.x * ratio.y) + "px");
    select("#mainCanvas").style("height", windowHeight + "px");
  } else
  {
    select("#mainCanvas").style("width", windowWidth  + "px");
    select("#mainCanvas").style("height", round(cvSiz.y * ratio.x) + "px");
  }
}
