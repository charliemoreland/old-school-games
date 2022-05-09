
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const scoreDisplay = document.getElementById('scoreDisplay')
document.getElementById("GameOver").style.visibility = "hidden";

canvas.width = 1000
canvas.height = 750

class Ship
{
    constructor()
    {
        this.velocity = {
            x: 0,
            y: 0
        }

        this.opacity = 1

        const image = new Image()
        image.src = './assets/invaders_ship.png'
        image.onload = () =>
        {
            const scale = 1.2
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale

            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 5
            }
        }
    }

    draw()
    {
        // ctx.fillStyle = 'red'
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        // ctx.clearRect(0,0, canvas.width, canvas.height)
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.drawImage(this.image, this.position.x, this.position.y,
            this.width, this.height)
        ctx.restore()

    }

    update()
    {
        if (this.image)
        {
            this.draw()
            this.position.x += this.velocity.x
        }
    }
}

class Invader
{
    constructor({position})
    {
        this.velocity = {
            x: 0,
            y: 0
        }

        const image = new Image()
        image.src = './assets/invaders_alien.png'
        image.onload = () =>
        {
            const scale = .8
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale

            this.position = {
                x: position.x,
                y: position.y
            }
        }
    }

    draw()
    {

        ctx.drawImage(this.image, this.position.x, this.position.y,
            this.width, this.height)
    }

    update({velocity})
    {
        if (this.image)
        {
            this.draw()
            this.position.x += velocity.x
            this.position.y += velocity.y
        }
    }

    shoot(invaderProjectiles)
    {
        invaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height
            },
            velocity: {
                x: 0,
                y: 2
            }
        }))
    }
}

class Projectile
{
    constructor({position, velocity})
    {
        this.position = position
        this.velocity = velocity

        this.radius = 4
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()
    }

    update()
    {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class InvaderProjectile
{
    constructor({position, velocity})
    {
        this.position = position
        this.velocity = velocity
        this.width = 3
        this.height = 10
    }

    draw() {
        ctx.fillStyle = 'white'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update()
    {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Particle
{
    constructor({position, velocity, radius, color})
    {
        this.position = position
        this.velocity = velocity
        this.radius = radius
        this.color = color
        this.opacity = 1
    }

    draw()
    {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }

    update()
    {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.opacity -= 0.01
    }
}

class Grid
{
    constructor()
    {
        this.position = {
            x: 0,
            y: 0,
        }

        this.velocity = {
            x: 2,
            y: 0
        }

        this.invaders = []

        const columns = Math.floor(Math.random() * 10 + 5)
        const rows = Math.floor(Math.random() * 5 + 2)

        this.width = columns * 40

        for (let x = 0; x < columns; x++)
        {
            for (let y = 0; y < rows; y++)
            {
                this.invaders.push(new Invader({position :
                        {
                            x: x * 40,
                            y: y * 40
                        }
                }))
            }
        }
        //console.log(this.invaders)
    }

    update()
    {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.velocity.y = 0

        if (this.position.x + this.width >= canvas.width || this.position.x <= 0)
        {
            this.velocity.x = -this.velocity.x
            this.velocity.y = 40
        }
    }
}


const ship = new Ship()
const projectiles = []
const grids = []
const invaderProjectiles = []
const particles = []

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

let frames = 0
let randomInterval = Math.floor(Math.random() * 500 + 500)
let game = {
    over: false,
    active: true
}

let score = 0
//console.log(randomInterval)

function createParticles({object, color})
{
    for (let i = 0; i < 15; i++)
    {
        particles.push(new Particle(
            {
                position: {
                    x: object.position.x + object.width / 2,
                    y: object.position.y + object.height / 2
                },
                velocity: {
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2
                },
                radius: Math.random() * 3,
                color: color || '#aa00ff'
            }))
    }
}

function animate()
{
    if (!game.active) return
    requestAnimationFrame(animate)
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ship.update()
    particles.forEach((particle, index) =>
    {
        if (particle.opacity <= 0)
        {
            setTimeout(() =>
            {
                particles.splice(index, 1)
            }, 0)

        }
        else
        {
            particle.update()
        }
    })
    invaderProjectiles.forEach((invaderProjectile, index) =>
    {
        if (invaderProjectile.position.y + invaderProjectile.height >= canvas.height)
        {
            setTimeout(() =>
            {
                invaderProjectiles.splice(index, 1)
            },0)
        }
        else
        {
            invaderProjectile.update()
        }

        // Player's ship is hit by an invader projectile
        if (invaderProjectile.position.y + invaderProjectile.height >= ship.position.y
        && invaderProjectile.position.x + invaderProjectile.width >= ship.position.x
        && invaderProjectile.position.x <= ship.position.x + ship.width)
        {
            setTimeout(() =>
            {
                invaderProjectiles.splice(index, 1)
                ship.opacity = 0
                game.over = true
                document.getElementById("GameOver").style.visibility = "visible";
                document.getElementById("screen").style.visibility = "hidden";
            },0)

            setTimeout(() =>
            {
                game.active = false
            },2000)

            createParticles(
                {
                    object: ship,
                    color: 'white'
                })
            console.log('HIT')
        }
    })
    projectiles.forEach((projectile, index) =>
    {
        if (projectile.position.y + projectile.radius <= 0)
        {
            projectiles.splice(index, 1)
        }
        else
            projectile.update()
    })

    grids.forEach((grid, gridIndex) =>
    {
        grid.update()
        if (frames % 100 === 0 && grid.invaders.length > 0)
        {
            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invaderProjectiles)
        }

        grid.invaders.forEach((invader, i) =>
        {
            invader.update({velocity: grid.velocity})

            // Projectiles hit enemies
            projectiles.forEach((projectile, j) =>
            {
                if (projectile.position.y - projectile.radius <= invader.position.y + invader.height
                && projectile.position.x + projectile.radius >= invader.position.x
                && projectile.position.x - projectile.radius <= invader.position.x + invader.width
                && projectile.position.y + projectile.radius >= invader.position.y)
                {

                    setTimeout(() =>
                    {
                        const invaderFound = grid.invaders.find(invader2 => invader2 === invader)
                        const projectileFound = projectiles.find(projectile2 => projectile2 === projectile)

                        // Remove invader and projectile from arrays once off-screen
                        if (invaderFound && projectileFound)
                        {
                            score += 100
                            scoreDisplay.innerHTML = score
                            createParticles(
                                {
                                    object: invader
                                })

                            grid.invaders.splice(i, 1)
                            projectiles.splice(j, 1)

                            if (grid.invaders.length > 0)
                            {
                                const firstInvader = grid.invaders[0]
                                const lastInvader = grid.invaders[grid.invaders.length - 1]

                                grid.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width

                                grid.position.x = firstInvader.position.x
                            }
                            else
                            {
                                grids.splice(gridIndex, 1)
                            }
                        }
                    }, 0)
                }
            })
        })
    })

    if (keys.a.pressed && ship.position.x >= 5)
    {
        ship.velocity.x = -8
    }
    else if (keys.d.pressed && ship.position.x + ship.width <= canvas.width - 5)
    {
        ship.velocity.x = 8
    }
    else
    {
        ship.velocity.x = 0
    }

    //console.log(frames)
    if (frames % randomInterval === 0)
    {
        grids.push(new Grid())
        randomInterval = Math.floor(Math.random() * 500 + 500)
        frames = 0
        //console.log(randomInterval)
    }




    frames++
}

animate()

addEventListener('keydown', ({key}) =>
{
    if (game.over) return
    //console.log(key)
    switch (key)
    {
        case 'a':
            //console.log('left')
            keys.a.pressed = true
            break
        case 'd':
            //console.log('right')
            keys.d.pressed = true
            break
        case ' ':
            //console.log('shoot!')
            keys.space.pressed = true
            projectiles.push(new Projectile({
                position: {
                    x: ship.position.x + ship.width / 2,
                    y: ship.position.y
                },
                velocity: {
                    x: 0,
                    y: -5
                }
            }))
            //console.log(projectiles)
            break
    }
})

addEventListener('keyup', ({key}) =>
{
    //console.log(key)
    switch (key)
    {
        case 'a':
            //console.log('left')
            keys.a.pressed = false
            break
        case 'd':
            //console.log('right')
            keys.d.pressed = false
            break
        case ' ':
            //console.log('shoot!')
            keys.space.pressed = false
            break
    }
})