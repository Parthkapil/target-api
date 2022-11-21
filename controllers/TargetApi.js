import { convertToBase64 } from "../utils/helper";
import axios from "axios";

export const searchProduct = async (req, res) => {
	console.log(req.body);
	const { term, limit } = req.body;

	// set up the request parameters
	const params = {
		api_key: process.env.API_KEY,
		type: "search",
		search_term: term,
		sort_by: "best_seller",
	};

	//hitting red circle api for search
	try {
		const searchRes = await axios.get(`${process.env.API_URI}`, { params });

		console.log("Search response %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
		// console.log(searchRes.data.search_results);
		const apiResp = searchRes.data.search_results.map(function (resp) {
			return {
				name: resp.product.title,
				brand: resp.product.brand,
				productId: resp.product.tcin,
				category: resp.product.class_id,
				productUri: resp.product.link,
				regularPrice: resp.offers.primary.price,
				promoPrice:
					resp.offers.all_offers[0].price == 0
						? resp.offers.primary.price
						: resp.offers.all_offers[0].price,
				size: "UNKNOWN",
				stockLevel: "UNKNOWN",
				images: resp.product.images,
				video: resp.product.videos,
			};
		});
		console.log(apiResp);
		return res.status(200).send(apiResp);
	} catch (error) {
		return res.status(500).send({
			message: `Error while fetching Target search results: ${error.message}`,
		});
	}
};
