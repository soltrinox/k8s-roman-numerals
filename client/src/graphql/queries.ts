import { gql } from 'apollo-boost';

const RomanList = (number: number, skip = 0) => gql`
	{
		romans(limit: ${number},skip:${skip}) {
			roman
			_id
		}
	}
`;

const ArabicList = (number: number, skip = 0) => gql`
	{
		arabics(limit: ${number},skip:${skip}) {
			arabic
			_id
		}
	}
`;

export { RomanList, ArabicList };
