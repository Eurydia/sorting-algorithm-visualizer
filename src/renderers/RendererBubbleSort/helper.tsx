import { ReactNode, Fragment } from "react";

export type IndexDetails = {
	compared: number[];
	swapped: number[];
	rightMostUnsortedElement: number;
	bubbling: number;
};

export type FrameState = IndexDetails & {
	frameDescription: ReactNode;
	elementStates: number[];
	swapCount: number;
	comparisonCount: number;
};

export const bubbleSort = (
	dataset: number[],
	size: number,
	frameStates: FrameState[],
): void => {
	let swapCount: number = 0;
	let comparisonCount: number = 0;

	const generateFrameState = (
		frameDescription: ReactNode,
		indexDetails: IndexDetails,
	): void => {
		frameStates.push({
			frameDescription,
			elementStates: [...dataset],
			swapCount,
			comparisonCount,
			...indexDetails,
		});
	};

	generateFrameState(
		<Fragment>
			Unsorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		{
			bubbling: -1,
			rightMostUnsortedElement: -1,
			compared: [],
			// beingSwapped: [],
			swapped: [],
		},
	);

	for (
		let offset = 0;
		offset < size - 1;
		offset++
	) {
		for (let i = 0; i < size - offset - 1; i++) {
			comparisonCount++;
			generateFrameState(
				<Fragment>
					Compare <code>input[{i}]</code> against{" "}
					<code>input[{i + 1}]</code>.
				</Fragment>,
				{
					rightMostUnsortedElement:
						size - offset - 1,
					bubbling: i,
					compared: [i, i + 1],
					swapped: [],
				},
			);

			const a = dataset[i];
			const b = dataset[i + 1];
			if (b >= a) {
				// generateFrameState(
				// 	<Fragment>
				// 		Bubbles <code>input[{i + 1}]</code> up
				// 		instead (since{" "}
				// 		<code>
				// 			input[{i}] &le; input[{i + 1}]
				// 		</code>
				// 		).
				// 	</Fragment>,
				// 	{
				// 		rightMostUnsortedElement:
				// 			size - offset - 1,
				// 		bubbling: i + 1,
				// 		compared: [i, i + 1],
				// 		swapped: [],
				// 	},
				// );
				continue;
			}

			dataset[i] = b;
			dataset[i + 1] = a;
			swapCount++;

			generateFrameState(
				<Fragment>
					Swapped <code>input[{i}]</code> and{" "}
					<code>input[{i + 1}]</code>.
				</Fragment>,
				// <Fragment>
				// 	Swapped <code>input[{i}]</code> and{" "}
				// 	<code>input[{i + 1}]</code> (since{" "}
				// 	<code>
				// 		input[{i}] &gt; input[{i + 1}]
				// 	</code>
				// 	).
				// </Fragment>,
				{
					rightMostUnsortedElement:
						size - offset - 1,
					bubbling: i + 1,
					compared: [],
					swapped: [i, i + 1],
				},
			);
		}
		// generateFrameState(
		// 	<Fragment>
		// 		Decrease unsorted region to{" "}
		// 		<code>input[0:{size - offset - 2}]</code>{" "}
		// 		and start again (the largest element is
		// 		the right-most unsorted element).
		// 	</Fragment>,
		// 	{
		// 		rightMostUnsortedElement:
		// 			size - offset - 1,
		// 		bubbling: size - offset - 1,
		// 		compared: [],
		// 		swapped: [],
		// 	},
		// );
	}

	generateFrameState(
		<Fragment>
			Sorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		{
			rightMostUnsortedElement: -1,
			bubbling: -1,
			compared: [],
			swapped: [],
		},
	);
};
