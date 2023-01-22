const Tour = require("../Models/tourSchema");

exports.getTourService = async () => {
  /* 
        const result = await Tour.find({
        $or: [{ _id: "63cc1c0630474a5b142f1fff" }, {name: "cox-baraz"}],
        });
  
        const result = await Tour.find({
        name: { $ne: "cox-bazar" },
        });
  
        const result = await Tour.find({
        maxGroupSize: { $gt: 5 },
        });
  
        const result = await Tour.find({
        maxGroupSize: { $lte: 5 },
        });
      
        const result = await Tour.find({
        name: { $in: ["cox-baraz", "china"] },
        });
  
        const result = await Tour.find({}, '-name -maxGroupSize -price');
    
        const result = await Tour.find({}, 'name maxGroupSize price');
  
        const result = await Tour.find({}, 'name price').limit(4);
  
  
  */
  const result = await Tour.find({}, "name maxGroupSize price ").sort({
    price: -1,
    maxGroupSize: -1,
  });
  return result;
};

exports.addTourService = async (data) => {
  const tour = new Tour(data);

  if (tour.maxGroupSize > 20) {
    tour.priceDiscount = 200;
  }
  const result = await tour.save();

  return result;
};

/* 
// how to save script

exports.addTourService = async (data) => {
  const tours = [];
  for (let i = 0; i < 50; i++) {
    tours.push(
      new Tour({
        name: `fake tour ${i}`,
        duration: 2 + i,
        maxGroupSize: 70 - i,
        difficulty: "easy",
        price: 2000 * i + 3,
        summary: "make a greate feeling",
        description:
        "who supervised the settlement there of Arakanese refugees from conquest by Myanmar (Burma) in 1799.",
        startDates: "20 jan 2023",
        startLocation: "kosba",
        locations: {
          coordinates: 7987094245 + i,
          address: "notor",
          description: "ghora-ghori",
          day: 5 + i,
        },
      }).save()
      );
    }
    const result = await Promise.all(tours);
    
    return result;
  };
*/

exports.updateTourService = async (productID, data) => {
  const result = await Tour.updateOne(
    { _id: productID },
    { $set: data },
    { runValidators: true }
  );

  /* 
    const tour = await Tour.findById(productID);
    const result = await tour.set(data).save();
*/
  return result;
};

exports.bulkUpdateTourService = async (data) => {
  //   const result = await Tour.updateMany({ _id: data.ids }, data.data, {
  //     runValidators: true,
  //   });

  const tours = [];
  data.ids.forEach((tour) => {
    tours.push(Tour.updateOne({ _id: tour.id }, tour.data));
  });
  const result = await Promise.all(tours);
  console.log(result);
  return result;
};

exports.deleteTourService = async (productID) => {
  const result = await Tour.deleteOne({ _id: productID });
  return result;
};

exports.bulkdeleteTourService = async (ids) => {
  const result = await Tour.deleteMany({ _id: ids });
  return result;
};
