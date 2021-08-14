radio.onReceivedString(function (receivedString) {
    if (receivedString == "AB") {
        basic.showLeds(`
            . . # . .
            . . # . .
            # # # # #
            . . # . .
            . . # . .
            `)
        Virage = 0
        Vitesse = 0
    }
    if (receivedString == "BOUTONA") {
        basic.showIcon(IconNames.SmallHeart)
        basic.showLeds(`
            . . . . .
            . # . # .
            # # # # #
            . # # # .
            . . # . .
            `)
        basic.showIcon(IconNames.Heart)
    }
    if (receivedString == "BOUTONB") {
        basic.showLeds(`
            . # # # .
            . # . # .
            . # # . .
            . # . # .
            . # # # .
            `)
        if (Vitesse < 100) {
            Vitesse += 5
            radio.sendValue("vitesse", Vitesse)
        }
    }
    if (receivedString == "R") {
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
        Vitesse = 1
        Virage = 0
        radio.sendValue("vitesse", Vitesse)
    }
    if (receivedString == "A") {
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
        Virage = 0
        Vitesse = 10
        radio.sendValue("vitesse", Vitesse)
    }
    if (receivedString == "G") {
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
        Virage = 1
    }
    if (receivedString == "D") {
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
        Virage = -1
    }
})
let sensorDifference = 0
let rightSensor = 0
let leftSensor = 0
let Virage = 0
let Vitesse = 0
basic.showIcon(IconNames.Heart)
radio.setGroup(1)
Vitesse = 0
Virage = 0
Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
basic.pause(100)
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
basic.forever(function () {
    if (Virage == -1) {
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, Vitesse)
    }
    if (Virage == 1) {
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, Vitesse)
    }
    if (Vitesse > 0) {
        leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
        rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
        sensorDifference = Math.abs(leftSensor - rightSensor)
        if (sensorDifference > 5) {
            if (leftSensor > rightSensor) {
                Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
                Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, Vitesse)
            } else {
                Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
                Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, Vitesse)
            }
        } else {
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, Vitesse)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, Vitesse)
        }
    } else {
        Kitronik_Move_Motor.stop()
    }
})
