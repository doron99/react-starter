import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const WATCHER_KEY = 'watcherDB'
_createWatchers()

export const watcherService = {
    query,
    get,
    remove,
    save,
    getEmptyCar,
    getDefaultFilter,
    getSpeedStats,
    getVendorStats
}
// For Debug (easy access from console):
// window.cs = carService

function query(filterBy = {}) {
    return storageService.query(WATCHER_KEY)
        .then(cars => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                cars = cars.filter(car => regExp.test(car.vendor))
            }

            if (filterBy.minSpeed) {
                cars = cars.filter(car => car.maxSpeed >= filterBy.minSpeed)
            }

            return cars
        })
}

function get(carId) {
    return storageService.get(WATCHER_KEY, carId)
        .then(car => {
            car = _setNextPrevCarId(car)
            return car
        })
}

function remove(carId) {
    return storageService.remove(WATCHER_KEY, carId)
}

function save(car) {
    if (car.id) {
        return storageService.put(WATCHER_KEY, car)
    } else {
        return storageService.post(WATCHER_KEY, car)
    }
}

function getEmptyCar(vendor = '', maxSpeed = '') {
    return { vendor, maxSpeed }
}

function getDefaultFilter(filterBy = { txt: '', minSpeed: 0 }) {
    return { txt: filterBy.txt, minSpeed: filterBy.minSpeed }
}

function getSpeedStats() {
    return storageService.query(WATCHER_KEY)
        .then(cars => {
            const carCountBySpeedMap = _getCarCountBySpeedMap(cars)
            const data = Object.keys(carCountBySpeedMap).map(speedName => ({ title: speedName, value: carCountBySpeedMap[speedName] }))
            return data
        })

}

function getVendorStats() {
    return storageService.query(WATCHER_KEY)
        .then(cars => {
            const carCountByVendorMap = _getCarCountByVendorMap(cars)
            const data = Object.keys(carCountByVendorMap)
                .map(vendor =>
                ({
                    title: vendor,
                    value: Math.round((carCountByVendorMap[vendor] / cars.length) * 100)
                }))
            return data
        })
}

function _createWatchers() {
    let cars = utilService.loadFromStorage(WATCHER_KEY)
    if (!cars || !cars.length) {
        const watchers = [
        {
            "id": "w101",
            "fullname": "Puki Ba",
            "movies": ["Rambo", "Rocky"]
        },
        {
            "id": "w102",
            "fullname": "Lara Croft",
            "movies": ["Tomb Raider", "Inception"]
        },
        {
            "id": "w103",
            "fullname": "John Doe",
            "movies": ["The Matrix", "Gladiator"]
        },
        {
            "id": "w104",
            "fullname": "Jane Smith",
            "movies": ["Avatar", "Titanic"]
        }
    ]
        utilService.saveToStorage(WATCHER_KEY, watchers)
    }
}

function _createWatcher(vendor, maxSpeed = 250) {
    const car = getEmptyCar(vendor, maxSpeed)
    car.id = utilService.makeId()
    return car
}

function _setNextPrevCarId(car) {
    return storageService.query(WATCHER_KEY).then((cars) => {
        const carIdx = cars.findIndex((currCar) => currCar.id === car.id)
        const nextCar = cars[carIdx + 1] ? cars[carIdx + 1] : cars[0]
        const prevCar = cars[carIdx - 1] ? cars[carIdx - 1] : cars[cars.length - 1]
        car.nextCarId = nextCar.id
        car.prevCarId = prevCar.id
        return car
    })
}

function _getCarCountBySpeedMap(cars) {
    const carCountBySpeedMap = cars.reduce((map, car) => {
        if (car.maxSpeed < 120) map.slow++
        else if (car.maxSpeed < 200) map.normal++
        else map.fast++
        return map
    }, { slow: 0, normal: 0, fast: 0 })
    return carCountBySpeedMap
}

function _getCarCountByVendorMap(cars) {
    const carCountByVendorMap = cars.reduce((map, car) => {
        if (!map[car.vendor]) map[car.vendor] = 0
        map[car.vendor]++
        return map
    }, {})
    return carCountByVendorMap
}