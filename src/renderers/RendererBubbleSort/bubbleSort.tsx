import { Fragment, ReactNode } from "react";

type IndexDetails = {
	comparing: number[];
	swapping: number[];
	rightMostUnsortedElement: number;
	keyElement: number;
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
			keyElement: -1,
			rightMostUnsortedElement: -1,
			comparing: [],
			swapping: [],
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
					Compared <code>input[{i}]</code>
					against <code>input[{i + 1}]</code>.
				</Fragment>,
				{
					rightMostUnsortedElement:
						size - offset - 1,
					keyElement: i,
					comparing: [i, i + 1],
					swapping: [],
				},
			);

			const a = dataset[i];
			const b = dataset[i + 1];

			if (b >= a) {
				generateFrameState(
					<Fragment>
						Moved <code>keyElement</code> to{" "}
						<code>input[{i + 1}]</code>.
					</Fragment>,
					{
						comparing: [i, i + 1],
						swapping: [],
						rightMostUnsortedElement:
							size - offset - 1,
						keyElement: i + 1,
					},
				);
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
				{
					rightMostUnsortedElement:
						size - offset - 1,
					keyElement: i + 1,
					comparing: [],
					swapping: [i, i + 1],
				},
			);
		}

		generateFrameState(
			<Fragment>
				Moved <code>keyElement</code> to{" "}
				<code>input[0]</code>.
			</Fragment>,
			{
				rightMostUnsortedElement:
					size - offset - 2,
				keyElement: 0,
				comparing: [],
				swapping: [],
			},
		);
	}

	generateFrameState(
		<Fragment>
			Sorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		{
			rightMostUnsortedElement: -1,
			keyElement: -1,
			comparing: [],
			swapping: [],
		},
	);
};
