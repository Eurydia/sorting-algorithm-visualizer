import { ReactNode, Fragment } from "react";
type IndexDetails = {
	compared: number[];
	swapped: number[];

	workingRegion: number[];
	pivot: number;
	pivotPosition: number;
};

export type FrameState = IndexDetails & {
	frameDescription: ReactNode;
	swapCount: number;
	comparisonCount: number;
	elementStates: number[];
};

export const quickSort = (
	dataset: number[],
	size: number,
	frameStates: FrameState[],
) => {
	let swapCount: number = 0;
	let comparisonCount: number = 0;

	const generateFrameState = (
		frameDescription: ReactNode,
		indexDetails: IndexDetails,
	): void => {
		frameStates.push({
			frameDescription,
			comparisonCount,
			swapCount,
			elementStates: [...dataset],
			...indexDetails,
		});
	};

	const __partition = (
		lowIndex: number,
		highIndex: number,
	): number => {
		generateFrameState(
			<Fragment>
				Consider elements between{" "}
				<code>
					input[{lowIndex}:{highIndex}]
				</code>
				.
			</Fragment>,
			{
				compared: [],
				swapped: [],
				workingRegion: [lowIndex, highIndex],
				pivot: -1,
				pivotPosition: -1,
			},
		);

		generateFrameState(
			<Fragment>
				Consider <code>input[{highIndex}]</code>{" "}
				as a pivot.
			</Fragment>,
			{
				compared: [],
				swapped: [],
				workingRegion: [lowIndex, highIndex],
				pivot: highIndex,
				pivotPosition: lowIndex,
			},
		);

		let pivotIndex: number = lowIndex;
		for (let i = lowIndex; i < highIndex; i++) {
			comparisonCount++;

			generateFrameState(
				<Fragment>
					Compare <code>input[{i}]</code> against{" "}
					<code>input[{highIndex}]</code>.
				</Fragment>,
				{
					compared: [i, highIndex],
					swapped: [],
					workingRegion: [lowIndex, highIndex],
					pivot: highIndex,
					pivotPosition: pivotIndex,
				},
			);

			if (dataset[i] > dataset[highIndex]) {
				continue;
			}

			const a = dataset[i];
			const b = dataset[pivotIndex];
			dataset[pivotIndex] = a;
			dataset[i] = b;

			swapCount++;

			generateFrameState(
				<Fragment>
					Swapped <code>input[{i}]</code> with{" "}
					<code>input[{pivotIndex}]</code>.
				</Fragment>,
				{
					compared: [],
					swapped: [i, pivotIndex],
					workingRegion: [lowIndex, highIndex],
					pivot: highIndex,
					pivotPosition: pivotIndex,
				},
			);
			pivotIndex++;
		}

		const a: number = dataset[pivotIndex];
		const b: number = dataset[highIndex];
		dataset[pivotIndex] = b;
		dataset[highIndex] = a;

		swapCount++;
		generateFrameState(
			<Fragment>
				Swapped <code>input[{pivotIndex}]</code>{" "}
				with <code>input[{highIndex}]</code>.
			</Fragment>,
			{
				compared: [],
				swapped: [pivotIndex, highIndex],
				workingRegion: [lowIndex, highIndex],
				pivot: highIndex,
				pivotPosition: pivotIndex,
			},
		);

		return pivotIndex;
	};

	const __quickSort = (
		lowIndex: number,
		highIndex: number,
	): void => {
		if (lowIndex >= highIndex || lowIndex < 0) {
			return;
		}

		const p: number = __partition(
			lowIndex,
			highIndex,
		);

		__quickSort(lowIndex, p - 1);
		__quickSort(p + 1, highIndex);
	};

	generateFrameState(
		<Fragment>
			Unsorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		{
			compared: [],
			swapped: [],
			workingRegion: [],
			pivot: -1,
			pivotPosition: -1,
		},
	);

	__quickSort(0, size - 1);

	generateFrameState(
		<Fragment>
			Sorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		{
			compared: [],
			swapped: [],
			workingRegion: [],
			pivot: -1,
			pivotPosition: -1,
		},
	);
};
