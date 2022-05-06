import { mongodb } from "@moonlitworks/persist"
import { Schema } from "mongoose"

export const RETURN_VALUE = "Complete CI/CD with fluentd logging";

type Feature = {
  id: string
  key: string
  value: string
}

const schema = new Schema({
  key: String,
  value: String,
}, {
  timestamps: true,
  versionKey: false,
})

async function testPersist(dbString: string | undefined) {
  if (!dbString) return
  await mongodb.connect(dbString)
  if (!mongodb.isConnected()) return

  const testRepo = mongodb.createMongoCrud<Feature>(mongodb.get()!, {
    collectionName: "features",
    schema,
    documentParser: (doc: any) => ({
      id: doc._id.toString(),
      key: doc.key,
      value: doc.value
    })
  })

  const createdFeature = await testRepo.create({ key: "test-key", value: "test-value" })
  console.log(createdFeature)
  if (!createdFeature) return

  const features = await testRepo.getAll()
  console.log(features)

  const feature = await testRepo.get(createdFeature.id)
  console.log(feature)

  const updatedFeature = await testRepo.update(createdFeature?.id, { value: "new-value" })
  console.log(updatedFeature)
  if (!updatedFeature) return

  const featureDeleted = await testRepo.delete(updatedFeature.id)
  console.log(featureDeleted)

  return
}

async function run() {
  await testPersist(process.env.DB_STRING)
  return RETURN_VALUE;
}

export default run();
