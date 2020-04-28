const ModelSpy = jest.fn(),
	SchemaSpy = jest.fn(),
	DELETE_MANY_SPY = jest.fn(),
	FIND_SPY = jest.fn(),
	TO_ARRAY_SPY = jest.fn(),
	FINDONE_SPY = jest.fn(),
	MOCK_RESULTS = {
		result: []
	};

export function Model(type: any, schema: any) {
	ModelSpy(type, schema);
	return {
		deleteMany: (params: any) => {
			DELETE_MANY_SPY(params);
			return Promise.resolve();
		},
		find: (query: any, options: any) => {
			FIND_SPY(query, options);
			return {
				skip: (value: any) => {
					return {
						limit: (value: any) => {
							return {
								toArray: () => {
									TO_ARRAY_SPY();
									return Promise.resolve(MOCK_RESULTS.result);
								}
							};
						}
					};
				}
			};
		},
		findOne: (query: any, options: any) => {
			FINDONE_SPY(query, options);
			return Promise.resolve(MOCK_RESULTS.result);
		}
	};
}

export function Schema(schema: any) {
	SchemaSpy(schema);
}

export { ModelSpy, SchemaSpy, DELETE_MANY_SPY, FIND_SPY, TO_ARRAY_SPY, FINDONE_SPY, MOCK_RESULTS };
