import gql from 'graphql-tag';

export const numeralSubscription = gql`
	subscription {
		numeralComputation {
			arabic
			roman
			_id
		}
	}
`;
