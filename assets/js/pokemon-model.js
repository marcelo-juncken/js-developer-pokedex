
class Pokemon {
    _id;
    _name;
    _type;
    _types = [];
    _photo;
    _animatedPhoto;
    _weight;
    _height;
    _genderRate;
    _description;
    _eggGroups = [];
    _genus;
    _growthRate;
    _stats = [];

    baseExp;
    abilities = [];
    moves = [];

    generation;
    evolutionChain;
    evolutions = [];
    evolutionsSprites = [];
    liked;

    constructor(id, name, type, types, photo, animatedPhoto, weight, height, stats) {
        this._id = id;
        this._name = name;
        this._type = type;
        this._types = types;
        this._photo = photo;
        this._animatedPhoto = animatedPhoto;
        this._weight = weight;
        this._height = height;
        this._stats = stats;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get types() {
        return this._types;
    }

    set types(value) {
        this._types = value;
    }

    get photo() {
        return this._photo;
    }

    set photo(value) {
        this._photo = value;
    }

    get animatedPhoto() {
        return this._animatedPhoto;
    }

    set animatedPhoto(value) {
        this._animatedPhoto = value;
    }

    get weight() {
        return this._weight;
    }

    set weight(value) {
        this._weight = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }


    get genderRate() {
        return this._genderRate;
    }

    set genderRate(value) {
        this._genderRate = parseInt(value);
    }


    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }


    get eggGroups() {
        return this._eggGroups;
    }

    set eggGroups(value) {
        this._eggGroups = value;
    }


    get genus() {
        return this._genus;
    }

    set genus(value) {
        this._genus = value;
    }


    get growthRate() {
        return this._growthRate;
    }

    set growthRate(value) {
        this._growthRate = value;
    }


    get stats() {
        return this._stats;
    }

    set stats(value) {
        this._stats = value;
    }
}
