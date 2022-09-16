import { Then } from "@wdio/cucumber-framework";
import chai from "chai";

Then(/^Inventory page should list (.*)$/, async function (numberOfProducts){
    if(!numberOfProducts) throw Error ('Invalid number provided')

    let productArr = await $$('[class="inventory_item"]');
    chai.expect(productArr.length).to.equal(parseInt(numberOfProducts));
})

Then(/^each price item should be greater than (.*)$/, async function (minimumPrice){
    if(!minimumPrice) throw Error ('Invalid number provided')

    let productPricesArr = await $$('[class="inventory_item_price"]');
    let priceArr = [];
    for(let i = 0; i < productPricesArr.length; i++){
        let price = await productPricesArr[i].getText();
        await priceArr.push(price)
    }
    
    const priceNumbersArr = priceArr.map(price => +(price.replace("$", "")));
    console.log(priceNumbersArr);
    /** Assert if the values are expected */
    let invalidPriceArr = priceNumbersArr.filter(ele => ele <= minimumPrice);
    chai.expect(invalidPriceArr.length).to.equal(0);
})
