p5.disableFriendlyErrors = true;
preload=_=> { fnt = loadImage("rsc/font-ascii_64x64.png"); }
let cvSiz;
//
setup=_=> {

  pixelDensity(1);
  frameRate(50);
  angleMode(DEGREES);
  cvSiz = createVector(1024,800);
  createCanvas(cvSiz.x, cvSiz.y).id("mainCanvas");
  //
  ix = 1040; sino = fade = 0; p = -1;
  //
  rasters = [];
  f = [false, false, false];
  Pal = [ [0,6,0], [0,0,6], [6,0,0], [6,6,0], [6,0,6], [0,6,6] ];
  buffers = [ createGraphics(1024,800), createGraphics(1024,800) ];
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
    rasters[j] = createGraphics(1024,80);
    rasters[j].background(0);
    rasters[j].strokeWeight( 1 );
    for ( i=0; i < 40; i++ ) {
      rasters[j].stroke([Pal[j][0]*(2+i), Pal[j][1]*(2+i), Pal[j][2]*(2+i)], 255);
      rasters[j].line( 0, i, 1024, i);
      rasters[j].line( 0, 79-i, 1024, 79-i);
    }
  }
  //
  buffers[0].background(0);
  push();
    for ( i=0; i<6; i++ ) {
      buffers[0].image( rasters[i%6].get(0,0,1024,80), 0, i*80, 1024, 80 );
    }
  pop();
  /*
    Generation/fabrication des phrases du ScrollTxt
      -> On découpe les phrases du textes en sprites ou 1 caractere = 1 sprite.
    NB : 
      -> image + get : 
        x2.5 Faster -> blocks[i][j].image( fnt.get((snts[i].charCodeAt(j)-32)*64, 0, 32, 32), 0, 0, 32, 32 );
      -> than copy : 
        -> blocks[i][j].copy( fnt, (snts[i].charCodeAt(j)-32)*64, 0, 32, 32, 0, 0, 32, 32 );
    NB2 :
      x2.5 faster sur plrs petits blocks [ 32x32 ]
      Mais x100 faster sur 1 gros block [ 1024x400 ]
    NB3 :
      -> !!! image + get -> plus rapide sur ecran logique [ buffer ] !!!
      -> sur ecran physique, il est plus lent et "accroche" /rapport à "copy"... 
  */
  blocks = Array.from( Array(snts.length), _=> Array() );
  for ( i = 0; i < snts.length; i++ ) { 
    //snts[i] = snts[i].toUpperCase();
    for ( j = 0; j < snts[i].length; j++ ) {
      blocks[i].push( createGraphics(32,32) );
      blocks[i][j].image( fnt.get((snts[i].charCodeAt(j)-32)*64, 0, 64, 64),0, 0, 32, 32 );
    }
  }
  windowResized();
  SwapMeIamFamous();
}
//
function draw() {
  background(0);
  // 'Neon' Rasters
  blendMode( NORMAL );
  push();
    for ( i = 0; i < 6; i++ )
    {
      sino = sin( frameCount + (i<<4) ) * 70;
      image(rasters[3+(i%3)],0,70 - sino,1024,30);
      image(rasters[3+(i%3)],0,715 + sino,1024,30);
    }
  pop();
  // Scroll Text
  for ( var i = 0; i < blocks[p].length; i++ ) { 
    image( blocks[p][i], ix + ( i<<5 ), 384 + sin( frameCount + (i*24) ) * 24, 32, 32 );
  }
  // 'Ethereal' Tube
  blendMode( HARD_LIGHT );
  push();
    if( fade != 255 ) tint(255,fade);
    image(buffers[0].get(0, 280, 1024, 80), 0, 360, 1024, 80 );
  pop();
  if ( ix < blocks[p].length * -32 )
  {
    f[0] = !f[0];
    (ix = 1040);
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
  buffers[1].image( buffers[0].get(0, 400, 1024, 80), 0, 0, 1024, 80 );
  buffers[1].image( buffers[0].get(0,0,1024,400), 0, 80, 1024, 400 );
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