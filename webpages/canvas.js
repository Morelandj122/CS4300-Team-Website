//One of Seven places that require input for new canvas section
var canvasLeaves = document.getElementById('canvasLeaves');
var cL = canvasLeaves.getContext('2d');
var canvasFireFlies = document.getElementById('canvasFireFlies');
var cF = canvasFireFlies.getContext('2d');
var canvasSnow = document.getElementById('canvasSnow');
var cS = canvasSnow.getContext('2d');
var canvasPyro = document.getElementById('canvasPyro');
var cP = canvasPyro.getContext('2d');
var canvasMeteor = document.getElementById('canvasMeteor');
var cM = canvasMeteor.getContext('2d');

var ScrollDistance = 0;
var CanvasInUse = canvasFireFlies;
var CanvasContextInUse = cF;
var IsLoaded = 1;

CanvasInUse.width = window.innerWidth;
CanvasInUse.height = window.innerHeight;

this.window.addEventListener('scroll', function () {
    console.log("Scroll = " + window.scrollY);
    //Second of Seven places that require input for new canvas section
    ScrollDistance = window.scrollY;
    if (ScrollDistance <= 1400) {
        if (IsLoaded != 1) {
            CanvasContextInUse.clearRect(0, 0, innerWidth, innerHeight);
            IsLoaded = 1;
            CanvasInUse = canvasFireFlies;
            CanvasContextInUse = cF;
            CanvasInUse.width = window.innerWidth;
            CanvasInUse.height = window.innerHeight;
            init();
        }
    } else if (ScrollDistance < 2000 && ScrollDistance > 1400) {
        if (IsLoaded != 0) {
            CanvasContextInUse.clearRect(0, 0, innerWidth, innerHeight);
            IsLoaded = 0;
            CanvasInUse = canvasLeaves;
            CanvasContextInUse = cL;
            CanvasInUse.width = window.innerWidth;
            CanvasInUse.height = window.innerHeight;
            init();
        }
    } else if (ScrollDistance < 3900 && ScrollDistance > 2000) {
        if (IsLoaded != 2) {
            CanvasContextInUse.clearRect(0, 0, innerWidth, innerHeight);
            IsLoaded = 2;
            CanvasInUse = canvasSnow;
            CanvasContextInUse = cS;
            CanvasInUse.width = window.innerWidth;
            CanvasInUse.height = window.innerHeight;
            init();
        }
    } else if (ScrollDistance < 5500 && ScrollDistance >= 4400) {
        if (IsLoaded != 4) {
            CanvasContextInUse.clearRect(0, 0, innerWidth, innerHeight);
            IsLoaded = 4;
            CanvasInUse = canvasMeteor;
            CanvasContextInUse = cM;
            CanvasInUse.width = window.innerWidth;
            CanvasInUse.height = window.innerHeight;
            init();
        }
    } else if (ScrollDistance < 4400 && ScrollDistance >= 3900) {
        if (IsLoaded != 1) {
            CanvasContextInUse.clearRect(0, 0, innerWidth, innerHeight);
            IsLoaded = 1;
            CanvasInUse = canvasFireFlies;
            CanvasContextInUse = cF;
            CanvasInUse.width = window.innerWidth;
            CanvasInUse.height = window.innerHeight;
            init();
        }
    } else if (ScrollDistance <= 6100 && ScrollDistance >= 5500) {
        if (IsLoaded != 3) {
            CanvasContextInUse.clearRect(0, 0, innerWidth, innerHeight);
            IsLoaded = 3;
            CanvasInUse = canvasPyro;
            CanvasContextInUse = cP;
            CanvasInUse.width = window.innerWidth;
            CanvasInUse.height = window.innerHeight;
            init();
        }
    } else if (ScrollDistance > 6100) {
        if (IsLoaded != 1) {
            CanvasContextInUse.clearRect(0, 0, innerWidth, innerHeight);
            IsLoaded = 1;
            CanvasInUse = canvasFireFlies;
            CanvasContextInUse = cF;
            CanvasInUse.width = window.innerWidth;
            CanvasInUse.height = window.innerHeight;
            init();
        }
    }
})

var mouse = {
    x: undefined,
    y: undefined
}

var click = {
    x: undefined,
    y: undefined
}

//unused
var maxRadius = 40;
var maxSpeed = 1;
var radius = 1;

//defaults
var lastTime = 0;
var interval = 1000 / 60; //60 fps
var timer = 0;
var motionCompensation = 2; //compentation value for fps change
var onClickRadius = 20;
var rect = CanvasInUse.getBoundingClientRect();
var TO_RADIANS = Math.PI / 180;
var spawnxdiv = 1;
var spawnxplus = 0; //innerWidth / X
var spawnydiv = 1;
var spawnyplus = 0; //innerHeight / X

//Third of Seven places that require input for new canvas section
function SpawnLocation() {
    if (CanvasInUse == canvasLeaves) {
        //tree location based on window width and height
        spawnxdiv = 5;
        spawnxplus = innerWidth / 5 * 2; //innerWidth / X
        spawnydiv = 5;
        spawnyplus = innerHeight / 5 * 3.25; //innerHeight / X
    } else if (CanvasInUse == canvasFireFlies) {
        spawnxdiv = 1;
        spawnxplus = 0; //innerWidth / X
        spawnydiv = 1;
        spawnyplus = 0; //innerHeight / X        
    } else if (CanvasInUse == canvasSnow) {
        spawnxdiv = 0.8;
        spawnxplus = innerWidth / 10; //innerWidth / X
        spawnydiv = 2.8;
        spawnyplus = innerHeight / 20; //innerHeight / X        
    } else if (CanvasInUse == canvasPyro) {
        spawnxdiv = 1;
        spawnxplus = 0; //innerWidth / X
        spawnydiv = 10;
        spawnyplus = innerHeight * 0.7; //innerHeight / X        
    } else if (CanvasInUse == canvasMeteor) {
        spawnxdiv = 1;
        spawnxplus = 0; //innerWidth / X
        spawnydiv = 2.8;
        spawnyplus = innerHeight / 20; //innerHeight / X        
    }
}

//firefly colors found on coolors.co
var colorArray = [
    '#FFFFFF',
    '#F5CB00',
    '#F6D220',
    '#F8D840',
    '#F9C74F',
    '#90BE6D',
    '#43AA8B',
    '#4D908E',
    '#577590',
    '#277DA1',
    '#F9DF60',
    '#FAE580',
];

//Snow colors found on coolors.co
var colorArraySnow = [
    '#FFFFFF',
    '#EDF2FB',
    '#E2EAFC',
    '#D7E3FC',
    '#CCDBFD',
    '#C1D3FE',
    '#B6CCFE',
    '#ABC4FF',
];

//Pyro colors found on coolors.co
var colorArrayPyro = [
    '#FF4800',
    '#FF5400',
    '#FF6000',
    '#FF6D00',
    '#FF7900',
    '#FF8500',
    '#FF9100',
    '#FF9E00',
    '#FFAA00',
    '#FFB600',
];

//Snowflake images
var snowFlakePngArray = [
    './snow/snowflake_1.png',
    './snow/snowflake_2.png',
    './snow/snowflake_3.png',
    './snow/snowflake_4.png',
    './snow/snowflake_5.png',
    './snow/snowflake_6.png',
    './snow/snowflake_7.png',
]

//leaf images
var leafPngArray = [
    './leaves/leaf_1.png',
    './leaves/leaf_2.png',
    './leaves/leaf_3.png',
    './leaves/leaf_4.png',
    './leaves/leaf_5.png',
    './leaves/leaf_6.png',
    './leaves/leaf_7.png',
    './leaves/leaf_8.png',
]

//meteor images
var meteorPngArray = [
    './meteors/meteor_1.png',
    './meteors/meteor_2.png',
    './meteors/meteor_3.png',
    './meteors/meteor_4.png',
    './meteors/meteor_5.png',
    './meteors/meteor_6.png',
    './meteors/meteor_7.png',
    './meteors/meteor_8.png',
]

window.addEventListener('mousemove', function (event) {
    //console.log("y = " + mouse.y + " and x = " + mouse.x);
    //fixed issue where mouse location was offset due to canvas size and window size -jeff
    rect = CanvasInUse.getBoundingClientRect();
    mouse.x = (event.x - rect.left) * (CanvasInUse.width / rect.width);
    mouse.y = (event.y - rect.top) * (CanvasInUse.height / rect.height);
});

window.addEventListener('click', function (event) {
    //console.log("y = " + click.y + " and x = " + click.x);
    //fixed issue where mouse clicks were offset due to canvas size and window size -jeff
    rect = CanvasInUse.getBoundingClientRect();
    click.x = (event.x - rect.left) * (CanvasInUse.width / rect.width);
    click.y = (event.y - rect.top) * (CanvasInUse.height / rect.height);
});

window.addEventListener('resize', function () {
    CanvasInUse.width = window.innerWidth;
    CanvasInUse.height = window.innerHeight;
    init();
});

//this function creates the shatter effect when clicked on
function Shatter(objectx, objecty, Objectradius) {
    if (CanvasInUse == canvasSnow) {
        for (let i = 0; i < 10; i++) {
            var radius = Math.random() * Objectradius + 0.3;
            var x = objectx;
            var y = objecty;
            var dx = (Math.random() - 0.5) * 3;
            var dy = (Math.random() - 0.5) * 3;
            var rotationalVelocity = (Math.random() - 0.5) * 4 * motionCompensation;
            var angleStart = Math.random() * 360;
            var lifespan = (1000 + 500) * 0.5 * motionCompensation;
            var isShatter = true;
            clickArray.push(new SnowFlake(x, y, dx, dy, radius, rotationalVelocity, angleStart, lifespan, isShatter));
        }
    } else if (CanvasInUse == canvasPyro || CanvasInUse == canvasMeteor) {
        for (let i = 0; i < 10; i++) {
            var radius = Math.random() * Objectradius + 0.3;
            var x = objectx;
            var y = objecty;
            var dx = (Math.random() - 0.5) * 3;
            var dy = (Math.random() - 0.5) * 3;
            var rotationalVelocity = (Math.random() - 0.5) * 4 * motionCompensation;
            var angleStart = Math.random() * 360;
            var lifespan = (1000 + 500) * 0.5 * motionCompensation;
            var isShatter = true;
            clickArray.push(new Pyro(x, y, dx, dy, radius, rotationalVelocity, angleStart, lifespan, isShatter));
        }
    }
    click.x = undefined;
    click.y = undefined;
}

/* function Circle(x, y, dx, dy, radius, minSpeeddx, minSpeeddy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.minSpeeddx = minSpeeddx;
    this.minSpeeddy = minSpeeddy;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    
    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        
        if (this.dx < minSpeeddx) {
            this.dx = minSpeeddx;
        }
        
        if (this.dy < minSpeeddy) {
            this.dy = minSpeeddy;
        }
        
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                if (this.radius < maxRadius) {
                    this.radius += 1;
                    this.x += this.dx * 8;
                    this.y += this.dy * 8;
                }
            } else if (this.radius > this.minRadius) {
                this.radius -= 1;
                this.x -= this.dx;
                this.y -= this.dy;
                
            }
            
            this.x += this.dx;
            this.y += this.dy;
            
            this.draw();
        }
    } */

//Fourth of Seven places that require input for new canvas section
function Leaf(x, y, dx, dy, radius, rotationalVelocity, angleStart, lifespan) {
    this.x = x;
    this.y = y;
    this.dx = dx * motionCompensation;
    this.dy = dy * motionCompensation;
    this.angle = angleStart;
    this.spin = rotationalVelocity * motionCompensation;
    this.acc = 0.05 * motionCompensation;
    this.radius = radius;
    this.gravity = 0.02 * motionCompensation;
    this.lifespan = lifespan / motionCompensation;
    this.life = Math.random() * lifespan / motionCompensation;
    this.imd = 75;
    this.img = new Image();
    this.img.src = leafPngArray[Math.floor(Math.random() * leafPngArray.length)];

    this.draw = function () {
        CanvasContextInUse.save();


        CanvasContextInUse.translate(this.x, this.y);
        CanvasContextInUse.rotate(this.angle * TO_RADIANS);

        if (this.life > (this.lifespan * 0.9)) {
            CanvasContextInUse.globalAlpha = (1 - (this.life / this.lifespan - 0.9) / 0.1);
        } else if (this.life > this.lifespan) {
            CanvasContextInUse.globalAlpha = 0;
        }

        CanvasContextInUse.drawImage(this.img, -(this.img.width / 2), -(this.img.height / 2));

        CanvasContextInUse.restore();
    }

    this.update = function () {
        this.life++;
        if (this.life >= this.lifespan * 1.0) {
            this.life = 0;
            this.x = (Math.random() * (innerWidth - radius * 2) + radius) / spawnxdiv + spawnxplus;
            this.y = (Math.random() * (innerHeight - radius * 2) + radius) / spawnydiv + spawnyplus;
        } else if (this.life >= this.lifespan * 0.8) {

            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }

            if (this.y - this.radius < 0) {
                this.dy = -this.dy;
            } //else if (this.y + this.radius > innerHeight) {this.dy = -this.dy;}

            if (this.dy > 10 * motionCompensation || this.dy < -10 * motionCompensation) {
                this.dy = this.dy / 2;
            } else if (this.dy > 2 * motionCompensation) {
                this.dy -= this.gravity;
            } else if (this.dy < 0.75 * motionCompensation) {
                this.dy += this.gravity;
            }

            if (this.dx > 10 * motionCompensation || this.dx < -10 * motionCompensation) {
                this.dx = this.dx / 2;
            } else if (this.dx > 1 * motionCompensation) {
                this.dx -= this.gravity;
            } else if (this.dx < -1 * motionCompensation) {
                this.dx += this.gravity;
            }


            //mouse interaction
            if (mouse.x - this.x > 0 && mouse.x - this.x < this.imd
                && mouse.y - this.y > 0 && mouse.y - this.y < this.imd) {
                //if object is upper left then object will move upper left
                this.dx = this.dx - Math.min(10, this.acc / (mouse.x - this.x) + this.acc + this.acc);
                this.dy = this.dy - Math.min(10, this.acc / (mouse.y - this.y) + this.acc + this.acc);
            } else if (mouse.x - this.x > 0 && mouse.x - this.x < this.imd
                && mouse.y - this.y > -this.imd && mouse.y - this.y < 0) {
                //if object is upper right then object will move upper right
                this.dx = this.dx - Math.min(10, this.acc / (mouse.x - this.x) + this.acc + this.acc);
                this.dy = this.dy + Math.min(10, this.acc / (mouse.y - this.y) + this.acc + this.acc);
            } else if (mouse.x - this.x > -this.imd && mouse.x - this.x < 0
                && mouse.y - this.y > 0 && mouse.y - this.y < this.imd) {
                //if object is lower left then object will move lower left
                this.dx = this.dx + Math.min(10, this.acc / (mouse.x - this.x) + this.acc + this.acc);
                this.dy = this.dy - Math.min(10, this.acc / (mouse.y - this.y) + this.acc + this.acc);
            } else if (mouse.x - this.x > -this.imd && mouse.x - this.x < 0
                && mouse.y - this.y > -this.imd && mouse.y - this.y < 0) {
                //if object is lower right then object will move lower right
                this.dx = this.dx + Math.min(10, this.acc / (mouse.x - this.x) + this.acc + this.acc);
                this.dy = this.dy + Math.min(10, this.acc / (mouse.y - this.y) + this.acc + this.acc);
            }

            this.x += this.dx;
            this.y += this.dy;
            this.angle += this.spin;

            this.draw();
        }
    }
}

function Meteor(x, y, dx, dy, radius, rotationalVelocity, angleStart, lifespan, isShatter) {
    this.x = x;
    this.y = y;
    this.dx = dx * motionCompensation;
    this.dy = dy * motionCompensation;
    this.angle = angleStart;
    this.spin = rotationalVelocity * motionCompensation;
    this.acc = 0.05 * motionCompensation;
    this.radius = radius;
    this.gravity = 0.02 * motionCompensation;
    this.lifespan = lifespan / motionCompensation;
    this.life = isShatter ? (lifespan / motionCompensation * 0.5) : (Math.random() * lifespan / motionCompensation);
    this.life = Math.random() * lifespan / motionCompensation;
    this.imd = 75;
    this.img = new Image();
    this.img.src = meteorPngArray[Math.floor(Math.random() * meteorPngArray.length)];

    this.draw = function () {
        CanvasContextInUse.save();


        CanvasContextInUse.translate(this.x, this.y);

        if (this.life > (this.lifespan * 0.9)) {
            CanvasContextInUse.globalAlpha = 1;
        } else if (this.life > this.lifespan) {
            CanvasContextInUse.globalAlpha = 0;
        }

        CanvasContextInUse.drawImage(this.img, -(this.radius / 2), -(this.radius / 2), this.radius, this.radius);

        CanvasContextInUse.restore();
    }

    this.update = function () {
        this.life++;
        if (this.life >= this.lifespan * 1.0) {
            this.life = 0;
            Shatter(this.x, this.y, this.radius / 2);
            this.x = (Math.random() * (innerWidth - radius * 2) + radius) / spawnxdiv + spawnxplus;
            this.y = (Math.random() * (innerHeight - radius * 2) + radius) / spawnydiv + spawnyplus;
        } else if (this.life >= this.lifespan * 0.8) {

            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                //this.dx = -this.dx;
            }

            if (this.y - this.radius < 0) {
                this.dy = -this.dy;
            } //else if (this.y + this.radius > innerHeight) {this.dy = -this.dy;}

            if (this.dy > 10 * motionCompensation || this.dy < -10 * motionCompensation) {
                this.dy = this.dy / 2;
            } else if (this.dy > 2 * motionCompensation) {
                this.dy -= this.gravity;
            } else if (this.dy < 0.75 * motionCompensation) {
                this.dy += this.gravity;
            }

            if (this.dx > 10 * motionCompensation || this.dx < -10 * motionCompensation) {
                this.dx = this.dx / 2;
            } else if (this.dx > 1 * motionCompensation) {
                this.dx -= this.gravity;
            } else if (this.dx < -1 * motionCompensation) {
                this.dx += this.gravity;
            }

            //on click interaction 
            if (Math.abs(click.x - this.x) < onClickRadius && Math.abs(click.y - this.y) < onClickRadius) {
                //console.log(click.x + "mx my" + click.y + this.x + "x y" +  this.y);
                this.life = 0;
                Shatter(this.x, this.y, this.radius / 2);
                this.x = (Math.random() * (innerWidth - radius * 2) + radius) / spawnxdiv + spawnxplus;
                this.y = (Math.random() * (innerHeight - radius * 2) + radius) / spawnydiv + spawnyplus;
            }

            this.x += this.dx;
            this.y += this.dy;

            this.draw();
        }
    }
}

function FireFly(x, y, dx, dy, radius, lifespan) {
    this.x = x;
    this.y = y;
    this.dx = dx * motionCompensation;
    this.dy = dy * motionCompensation;
    this.acc = 0.05 * motionCompensation;
    this.radius = radius;
    this.gravity = 0.02 * motionCompensation;
    this.lifespan = lifespan / motionCompensation;
    this.life = Math.random() * lifespan / motionCompensation;
    this.imd = 75;
    this.img = new Image();
    this.img.src = leafPngArray[Math.floor(Math.random() * leafPngArray.length)];
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        CanvasContextInUse.save();

        if (this.life > (this.lifespan * 0.90)) {
            CanvasContextInUse.globalAlpha = (1 - (this.life / this.lifespan - 0.90) / 0.1);
        } else if (this.life > (this.lifespan * 0.85)) {
            CanvasContextInUse.globalAlpha = ((this.life / this.lifespan - 0.85) / 0.2);
        } else if (this.life > this.lifespan) {
            CanvasContextInUse.globalAlpha = 0;
        }
        var gradient = CanvasContextInUse.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(.2, this.color);
        gradient.addColorStop(1, 'transparent');
        CanvasContextInUse.beginPath();
        CanvasContextInUse.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        //CanvasContextInUse.fillStyle = this.color;
        CanvasContextInUse.fillStyle = gradient;
        CanvasContextInUse.fill();
        CanvasContextInUse.restore();
    }

    this.update = function () {
        this.life++;
        if (this.life >= this.lifespan * 1.0) {
            this.life = 0;
            this.x = (Math.random() * (innerWidth - radius * 2) + radius) / spawnxdiv + spawnxplus;
            this.y = (Math.random() * (innerHeight - radius * 2) + radius) / spawnydiv + spawnyplus;
        } else if (this.life >= this.lifespan * 0.85) {

            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }

            if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            if (this.dy > 10 * motionCompensation || this.dy < -10 * motionCompensation) {
                this.dy = this.dy / 2;
            } else if (this.dy > 1 * motionCompensation) {
                this.dy -= this.gravity;
            } else if (this.dy < -1 * motionCompensation) {
                this.dy += this.gravity;
            }

            if (this.dx > 10 * motionCompensation || this.dx < -10 * motionCompensation) {
                this.dx = this.dx / 2;
            } else if (this.dx > 1 * motionCompensation) {
                this.dx -= this.gravity;
            } else if (this.dx < -1 * motionCompensation) {
                this.dx += this.gravity;
            }


            //mouse interaction
            if (mouse.x - this.x > 0 && mouse.x - this.x < this.imd
                && mouse.y - this.y > 0 && mouse.y - this.y < this.imd) {
                //if object is upper left then object will move upper left
                this.dx = this.dx - Math.min(10, this.acc / (mouse.x - this.x) + this.acc + this.acc);
                this.dy = this.dy - Math.min(10, this.acc / (mouse.y - this.y) + this.acc + this.acc);
            } else if (mouse.x - this.x > 0 && mouse.x - this.x < this.imd
                && mouse.y - this.y > -this.imd && mouse.y - this.y < 0) {
                //if object is upper right then object will move upper right
                this.dx = this.dx - Math.min(10, this.acc / (mouse.x - this.x) + this.acc + this.acc);
                this.dy = this.dy + Math.min(10, this.acc / (mouse.y - this.y) + this.acc + this.acc);
            } else if (mouse.x - this.x > -this.imd && mouse.x - this.x < 0
                && mouse.y - this.y > 0 && mouse.y - this.y < this.imd) {
                //if object is lower left then object will move lower left
                this.dx = this.dx + Math.min(10, this.acc / (mouse.x - this.x) + this.acc + this.acc);
                this.dy = this.dy - Math.min(10, this.acc / (mouse.y - this.y) + this.acc + this.acc);
            } else if (mouse.x - this.x > -this.imd && mouse.x - this.x < 0
                && mouse.y - this.y > -this.imd && mouse.y - this.y < 0) {
                //if object is lower right then object will move lower right
                this.dx = this.dx + Math.min(10, this.acc / (mouse.x - this.x) + this.acc + this.acc);
                this.dy = this.dy + Math.min(10, this.acc / (mouse.y - this.y) + this.acc + this.acc);
            }

            this.x += this.dx;
            this.y += this.dy;

            this.draw();
        }
    }
}

function SnowFlake(x, y, dx, dy, radius, rotationalVelocity, angleStart, lifespan, isShatter) {
    this.x = x;
    this.y = y;
    this.dx = dx * motionCompensation;
    this.dy = dy * motionCompensation;
    this.angle = angleStart;
    this.spin = rotationalVelocity * motionCompensation;
    this.acc = 0.05 * motionCompensation;
    this.radius = radius;
    this.gravity = 0.02 * motionCompensation;
    this.lifespan = lifespan / motionCompensation;
    this.life = isShatter ? (lifespan / motionCompensation * 0.5) : (Math.random() * lifespan / motionCompensation);
    this.color = colorArraySnow[Math.floor(Math.random() * colorArraySnow.length)];
    this.img = new Image();
    this.img.src = snowFlakePngArray[Math.floor(Math.random() * snowFlakePngArray.length)];


    this.draw = function () {
        CanvasContextInUse.save();
        CanvasContextInUse.translate(this.x, this.y);
        CanvasContextInUse.rotate(this.angle * TO_RADIANS);

        if (this.life > (this.lifespan * 0.9)) {
            CanvasContextInUse.globalAlpha = (1 - (this.life / this.lifespan - 0.9) / 0.1);
        } else if (this.life > this.lifespan) {
            CanvasContextInUse.globalAlpha = 0;
        }
        CanvasContextInUse.drawImage(this.img, -(this.radius / 2), -(this.radius / 2), this.radius, this.radius);
        CanvasContextInUse.restore();
    }

    this.drawNotInUse = function () {
        CanvasContextInUse.save();

        if (this.life > (this.lifespan * 0.9)) {
            CanvasContextInUse.globalAlpha = (1 - (this.life / this.lifespan - 0.9) / 0.1);
        } else if (this.life > this.lifespan) {
            CanvasContextInUse.globalAlpha = 0;
        }
        var gradient = CanvasContextInUse.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.6, this.color);
        gradient.addColorStop(1, 'transparent');
        CanvasContextInUse.beginPath();
        CanvasContextInUse.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        //CanvasContextInUse.fillStyle = this.color;
        CanvasContextInUse.fillStyle = gradient;
        CanvasContextInUse.fill();
        CanvasContextInUse.restore();
    }

    this.update = function () {
        this.life++;
        if (this.life >= this.lifespan * 1.0) {
            this.life = 0;
            this.x = (Math.random() * (innerWidth - radius * 2) + radius) / spawnxdiv + spawnxplus;
            this.y = (Math.random() * (innerHeight - radius * 2) + radius) / spawnydiv + spawnyplus;
        } else if (this.life >= this.lifespan * 0.5) {

            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }

            if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            if (this.dy > 5 * motionCompensation || this.dy < -5 * motionCompensation) {
                this.dy = this.dy / 2;
            } else if (this.dy > 1 * motionCompensation) {
                this.dy -= this.gravity;
            } else if (this.dy < 0.1 * motionCompensation) {
                this.dy += this.gravity;
            }

            if (this.dx > 5 * motionCompensation || this.dx < -5 * motionCompensation) {
                this.dx = this.dx / 2;
            } else if (this.dx > 0.5 * motionCompensation) {
                this.dx -= this.gravity;
            } else if (this.dx < -0.5 * motionCompensation) {
                this.dx += this.gravity;
            }

            //on click interaction 
            if (Math.abs(click.x - this.x) < onClickRadius && Math.abs(click.y - this.y) < onClickRadius) {
                //console.log(click.x + "mx my" + click.y + this.x + "x y" +  this.y);
                this.life = 0;
                Shatter(this.x, this.y, this.radius);
                this.x = (Math.random() * (innerWidth - radius * 2) + radius) / spawnxdiv + spawnxplus;
                this.y = (Math.random() * (innerHeight - radius * 2) + radius) / spawnydiv + spawnyplus;
            }

            this.x += this.dx;
            this.y += this.dy;
            this.angle += this.spin;

            this.draw();
        }
    }
}

function Pyro(x, y, dx, dy, radius, rotationalVelocity, angleStart, lifespan, isShatter) {
    this.x = x;
    this.y = y;
    this.dx = dx * motionCompensation;
    this.dy = dy * motionCompensation;
    this.angle = angleStart;
    this.spin = rotationalVelocity * motionCompensation;
    this.acc = 0.05 * motionCompensation;
    this.radius = radius;
    this.gravity = 0.02 * motionCompensation;
    this.lifespan = lifespan / motionCompensation;
    this.life = isShatter ? (lifespan / motionCompensation * 0.5) : (Math.random() * lifespan / motionCompensation);
    this.color = colorArrayPyro[Math.floor(Math.random() * colorArrayPyro.length)];
    this.img = new Image();
    this.img.src = snowFlakePngArray[Math.floor(Math.random() * snowFlakePngArray.length)];


    this.rotate = function () {
        CanvasContextInUse.save();
        CanvasContextInUse.translate(this.x, this.y);
        CanvasContextInUse.rotate(this.angle * TO_RADIANS);

        if (this.life > (this.lifespan * 0.9)) {
            CanvasContextInUse.globalAlpha = (1 - (this.life / this.lifespan - 0.9) / 0.1);
        } else if (this.life > this.lifespan) {
            CanvasContextInUse.globalAlpha = 0;
        }
        CanvasContextInUse.drawImage(this.img, -(this.radius / 2), -(this.radius / 2), this.radius, this.radius);
        CanvasContextInUse.restore();
    }

    this.draw = function () {
        CanvasContextInUse.save();

        if (this.life > (this.lifespan * 0.9)) {
            CanvasContextInUse.globalAlpha = (1 - (this.life / this.lifespan - 0.9) / 0.1);
        } else if (this.life > this.lifespan) {
            CanvasContextInUse.globalAlpha = 0;
        }
        var gradient = CanvasContextInUse.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color);
        //gradient.addColorStop(0.1, this.color);
        gradient.addColorStop(1, 'transparent');
        CanvasContextInUse.beginPath();
        CanvasContextInUse.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        //CanvasContextInUse.fillStyle = this.color;
        CanvasContextInUse.fillStyle = gradient;
        CanvasContextInUse.fill();
        CanvasContextInUse.restore();
    }

    this.update = function () {
        this.life++;
        if (this.life >= this.lifespan * 1.0) {
            this.life = 0;
            this.x = (Math.random() * (innerWidth - radius * 2) + radius) / spawnxdiv + spawnxplus;
            this.y = (Math.random() * (innerHeight - radius * 2) + radius) / spawnydiv + spawnyplus;
        } else if (this.life >= this.lifespan * 0.5) {

            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }

            if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            if (this.dy > 5 * motionCompensation || this.dy < -5 * motionCompensation) {
                this.dy = this.dy / 2;
            } else if (this.dy < -1 * motionCompensation) {
                this.dy += this.gravity;
            } else if (this.dy > -0.1 * motionCompensation) {
                this.dy -= this.gravity;
            }

            if (this.dx > 5 * motionCompensation || this.dx < -5 * motionCompensation) {
                this.dx = this.dx / 2;
            } else if (this.dx > 0.5 * motionCompensation) {
                this.dx -= this.gravity;
            } else if (this.dx < -0.5 * motionCompensation) {
                this.dx += this.gravity;
            }

            //on click interaction 
            if (Math.abs(click.x - this.x) < onClickRadius && Math.abs(click.y - this.y) < onClickRadius) {
                //console.log(click.x + "mx my" + click.y + this.x + "x y" +  this.y);
                this.life = 0;
                Shatter(this.x, this.y, this.radius);
                this.x = (Math.random() * (innerWidth - radius * 2) + radius) / spawnxdiv + spawnxplus;
                this.y = (Math.random() * (innerHeight - radius * 2) + radius) / spawnydiv + spawnyplus;
            }

            this.x += this.dx;
            this.y += this.dy;

            this.draw();
            //this.rotate(this.x, this.y, this.angle += this.spin);
        }
    }
}

//Fifth of Seven places that require input for new canvas section
//var circleArray = [];
var leafArray = [];
var fireFlyArray = [];
var snowFlakeArray = [];
var pyroArray = [];
var meteorArray = [];
var clickArray = [];

function init() {
    clickArray = [];
    SpawnLocation();

    //Sixth of Seven places that require input for new canvas section
    /*     circleArray = [];
    for (let i = 0; i < 800; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        var minSpeeddx = dx;
        var minSpeeddy = dy;
        circleArray.push(new Circle(x, y, dx, dy, radius, minSpeeddx, minSpeeddy));
    } */
    if (CanvasInUse == canvasLeaves) {
        leafArray = [];
        for (let i = 0; i < 100; i++) {
            var radius = 3 + 1;
            var x = (Math.random() * (innerWidth - radius * 2) + radius) / spawnxdiv + spawnxplus;
            var y = (Math.random() * (innerHeight - radius * 2) + radius) / spawnydiv + spawnyplus;
            var dx = (Math.random() - 0.5) * 2;
            var dy = (Math.random() * 2) + 0.25;
            var rotationalVelocity = (Math.random() - 0.5) * 4;
            var angleStart = Math.random() * 360;
            var lifespan = Math.random() * 8000 + 2000;
            leafArray.push(new Leaf(x, y, dx, dy, radius, rotationalVelocity, angleStart, lifespan));
        }
    } else if (CanvasInUse == canvasMeteor) {
        meteorArray = [];
        for (let i = 0; i < 100; i++) {
            var radius = Math.random() * 20 + 10;
            var x = (Math.random() * (innerWidth - radius * 2) + radius) / spawnxdiv + spawnxplus;
            var y = (Math.random() * (innerHeight - radius * 2) + radius) / spawnydiv + spawnyplus;
            var dx = (Math.random() * 2) + 0.5;
            var dy = (Math.random() * 2) + 0.25;
            var rotationalVelocity = (Math.random() - 0.5) * 4;
            var angleStart = Math.random() * 360;
            var lifespan = Math.random() * 8000 + 2000;
            var isShatter = false;
            meteorArray.push(new Meteor(x, y, dx, dy, radius, rotationalVelocity, angleStart, lifespan, isShatter));
        }
    } else if (CanvasInUse == canvasFireFlies) {
        fireFlyArray = [];
        for (let i = 0; i < 100; i++) {
            var radius = Math.random() * 6 + 4;
            var x = (Math.random() * (innerWidth - radius * 2) + radius) / spawnxdiv + spawnxplus;
            var y = (Math.random() * (innerHeight - radius * 2) + radius) / spawnydiv + spawnyplus;
            var dx = (Math.random() - 0.5) * 2;
            var dy = (Math.random() - 0.5) * 2;
            var lifespan = Math.random() * 4000 + 1000;
            fireFlyArray.push(new FireFly(x, y, dx, dy, radius, lifespan));
        }
    } else if (CanvasInUse == canvasSnow) {
        snowFlakeArray = [];
        for (let i = 0; i < 100; i++) {
            var radius = Math.random() * 10 + 4;
            var x = (Math.random() * (innerWidth - radius * 2) + radius) / spawnxdiv + spawnxplus;
            var y = (Math.random() * (innerHeight - radius * 2) + radius) / spawnydiv + spawnyplus;
            var dx = (Math.random() - 0.5) * 2;
            var dy = (Math.random() * 1) + 0.1;
            var rotationalVelocity = (Math.random() - 0.5) * 4;
            var angleStart = Math.random() * 360;
            var lifespan = Math.random() * 1000 + 500;
            var isShatter = false;
            snowFlakeArray.push(new SnowFlake(x, y, dx, dy, radius, rotationalVelocity, angleStart, lifespan, isShatter));
        }
    } else if (CanvasInUse == canvasPyro) {
        pyroArray = [];
        for (let i = 0; i < 100; i++) {
            var radius = Math.random() * 6 + 2;
            var x = (Math.random() * (innerWidth - radius * 2) + radius) / spawnxdiv + spawnxplus;
            var y = (Math.random() * (innerHeight - radius * 2) + radius) / spawnydiv + spawnyplus;
            var dx = (Math.random() - 0.5) * 2;
            var dy = (Math.random() * -1) - 0.1;
            var rotationalVelocity = (Math.random() - 0.5) * 4;
            var angleStart = Math.random() * 360;
            var lifespan = Math.random() * 1000 + 500;
            var isShatter = false;
            pyroArray.push(new Pyro(x, y, dx, dy, radius, rotationalVelocity, angleStart, lifespan, isShatter));
        }
    }
}

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > interval) {
        //run stuff
        timer = 0;
        CanvasContextInUse.clearRect(0, 0, innerWidth, innerHeight);

        //this reduces the clickarray objects then remove them once they reach a certain size
        for (let i = 0; i < clickArray.length; i++) {
            clickArray[i].radius -= 0.05 * motionCompensation;
            clickArray[i].update();
            if (clickArray[i].radius <= 0.3) {
                clickArray.splice(i, 1);
                i--;
            }
        }

        /*     for (var i = 0; i < circleArray.length; i++) {
            circleArray[i].update();
        } */

        //Seventh of Seven places that require input for new canvas section
        if (CanvasInUse == canvasLeaves) {
            for (var i = 0; i < leafArray.length; i++) {
                leafArray[i].update();
            }
        } else if (CanvasInUse == canvasMeteor) {
            for (var i = 0; i < meteorArray.length; i++) {
                meteorArray[i].update();
            }
        } else if (CanvasInUse == canvasFireFlies) {
            for (var i = 0; i < fireFlyArray.length; i++) {
                fireFlyArray[i].update();
            }
        } else if (CanvasInUse == canvasSnow) {
            for (var i = 0; i < snowFlakeArray.length; i++) {
                snowFlakeArray[i].update();
            }
        } else if (CanvasInUse == canvasPyro) {
            for (var i = 0; i < pyroArray.length; i++) {
                pyroArray[i].update();
            }
        }
    } else {
        timer += deltaTime
    }
    requestAnimationFrame(animate);
}

init();
animate(0);