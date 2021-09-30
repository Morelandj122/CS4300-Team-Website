var scrolldistance = 0;

window.addEventListener('load', function () {
    scrolldistance = window.scrollY;
    console.log("scroll distance: " + scrolldistance);


    if (scrolldistance < 500) {

        var canvas = document.getElementById('canvasFireFlies');
        var c = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        var mouse = {
            x: undefined,
            y: undefined
        }

        var maxRadius = 40;
        var maxSpeed = 1;
        var radius = 1;
        var TO_RADIANS = Math.PI / 180;
        var spawnxdiv = 4;
        var spawnxplus = innerWidth / 3; //innerWidth / X
        var spawnydiv = 3;
        var spawnyplus = 0; //innerHeight / X

        var colorArray = [
            '#ffaa33',
            '#99ffaa',
            '#00ff00',
            '#4411aa',
            '#ff1100',
        ];

        var leafPngArray = [
            './leaves/leaf_1.png',
            './leaves/leaf_2.png',
            './leaves/leaf_3.png',
            './leaves/leaf_4.png',
            './leaves/leaf_5.png',
            './leaves/leaf_6.png',
            './leaves/leaf_7.png'
        ]
        console.log();

        window.addEventListener('mousemove', function (event) {
            //console.log("y = " + mouse.y + " and x = " + mouse.x);
            mouse.x = event.x;
            mouse.y = event.y;
        });

        window.addEventListener('resize', function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });

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

        function FireFly(x, y, dx, dy, radius, rotationalVelocity, angleStart, lifespan) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.angle = angleStart;
            this.spin = rotationalVelocity;
            this.acc = 0.05;
            this.radius = radius;
            this.gravity = 0.02;
            this.lifespan = lifespan;
            this.life = Math.random() * lifespan;
            this.imd = 75;
            this.img = new Image();
            this.img.src = leafPngArray[Math.floor(Math.random() * leafPngArray.length)];

            this.draw = function () {
                c.drawImage(this.img, this.x, this.y);
            }

            this.rotate = function (x, y, angle) {
                c.save();


                c.translate(x, y);
                c.rotate(angle * TO_RADIANS);

                if (this.life > (this.lifespan * 0.9)) {
                    c.globalAlpha = (1 - (this.life / this.lifespan - 0.9) / 0.1);//(1 / (this.lifespan / 250 - this.life / 250)));
                } else if (this.life > this.lifespan) {
                    c.globalAlpha = 0;
                }

                c.drawImage(this.img, -(this.img.width / 2), -(this.img.height / 2));

                c.restore();
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

                    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                        this.dy = -this.dy;
                    }

                    if (this.dy > 10) {
                        this.dy = this.dy / 2;
                    } else if (this.dy > 2) {
                        this.dy -= this.gravity;
                    } else if (this.dy < 0.75) {
                        this.dy += this.gravity;
                    }

                    if (this.dx > 10) {
                        this.dx = this.dx / 2;
                    } else if (this.dx > 1) {
                        this.dx -= this.gravity;
                    } else if (this.dx < -1) {
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

                    this.rotate(this.x, this.y, this.angle += this.spin);
                }

                //this.draw();
            }
        }

        //var circleArray = [];
        var fireFlyArray = [];

        function init() {

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

            fireFlyArray = [];
            for (let i = 0; i < 100; i++) {
                var radius = 3 + 1;
                var x = (Math.random() * (innerWidth - radius * 2) + radius) / spawnxdiv + spawnxplus;
                var y = (Math.random() * (innerHeight - radius * 2) + radius) / spawnydiv + spawnyplus;
                var dx = (Math.random() - 0.5) * 1;
                var dy = (Math.random() * 0.5) + 0.25;
                var rotationalVelocity = (Math.random() - 0.5) * 4;
                var angleStart = Math.random() * 360;
                var lifespan = Math.random() * 8000 + 2000;
                fireFlyArray.push(new FireFly(x, y, dx, dy, radius, rotationalVelocity, angleStart, lifespan));
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            c.clearRect(0, 0, innerWidth, innerHeight);

            //for (var i = 0; i < circleArray.length; i++) {
            //    circleArray[i].update();
            //}

            for (var i = 0; i < fireFlyArray.length; i++) {
                fireFlyArray[i].update();
            }

        }

        init();
        animate();
    }
})