import { gql } from 'apollo-boost';

const convertToRoman = gql`
	mutation convertToRoman($value: Int!) {
		convertToRoman(value: $value) {
			result {
				roman
			}
			error
			message
		}
	}
`;

const convertToArabic = gql`
	mutation convertToArabic($value: String!) {
		convertToArabic(value: $value) {
			result {
				arabic
			}
			error
			message
		}
	}
`;

const deleteAll = () => gql`
	mutation {
		deleteAll {
			message
		}
	}
`;

export { convertToRoman, convertToArabic, deleteAll };
