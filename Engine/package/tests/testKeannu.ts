import { settings, Model } from "../index"

const model = new Model()
model.src = "keannu.glb"
model.scale = 5
model.metalnessFactor = 2
model.roughnessFactor = 0.5

settings.defaultLight = "studio"
