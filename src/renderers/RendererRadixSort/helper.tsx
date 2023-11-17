import { Fragment, ReactNode } from "react";

type IndexDetails = {
	mainMemRead: number;
	mainMemWritten: number;
	auxiMemRead: number;
	auxiMemWritten: number;
	sortMemRead: number;
	sortMemWritten: number;
};

export type FrameState = IndexDetails & {
	frameDescription: ReactNode;
	mainElementStates: number[];
	auxiElementStates: number[];
	sortElementStates: number[];
	memWriteCount: number;
	memReadCount: number;
};

export const radixSort = (
	dataset: number[],
	size: number,
	frameStates: FrameState[],
): void => {
	const maxValue = Math.max(...dataset);

	let memWriteCount: number = 0;
	let memReadCount: number = 0;

	let auxiMemory: number[] = [];
	let sortMemory: number[] = [];

	const generateFrameState = (
		frameDescription: ReactNode,
		indexDetails: IndexDetails,
	): void => {
		frameStates.push({
			frameDescription,
			mainElementStates: [...dataset],
			auxiElementStates: [...auxiMemory],
			sortElementStates: [...sortMemory],
			memReadCount,
			memWriteCount,
			...indexDetails,
		});
	};

	const countSort = (digit: number): void => {
		auxiMemory = [];
		sortMemory = [];

		for (let i = 0; i < size; i++) {
			auxiMemory[i] = 0;

			memWriteCount++;
			generateFrameState(
				<Fragment>
					Wrote 0 to <code>auxiMemory[{i}]</code>
				</Fragment>,
				{
					mainMemRead: -1,
					mainMemWritten: -1,
					auxiMemRead: -1,
					auxiMemWritten: i,
					sortMemRead: -1,
					sortMemWritten: -1,
				},
			);
		}

		for (let i = 0; i < size; i++) {
			const tIndex =
				Math.floor(dataset[i] / digit) % 10;
			auxiMemory[tIndex]++;

			memReadCount++;
			memWriteCount++;
			generateFrameState(
				<Fragment>
					Incremented{" "}
					<code>auxiMemory[{tIndex}]</code> by
					one.
				</Fragment>,
				{
					mainMemRead: i,
					mainMemWritten: -1,
					auxiMemRead: -1,
					auxiMemWritten: tIndex,
					sortMemRead: -1,
					sortMemWritten: -1,
				},
			);
		}

		for (let i = 1; i < size; i++) {
			auxiMemory[i] += auxiMemory[i - 1];

			memReadCount++;
			memWriteCount++;
			generateFrameState(
				<Fragment>
					Incremented <code>auxiMemory[{i}]</code>{" "}
					by
					<code>auxiMemory[{i - 1}]</code>.
				</Fragment>,
				{
					mainMemRead: -1,
					mainMemWritten: -1,
					auxiMemRead: i - 1,
					auxiMemWritten: i,
					sortMemRead: -1,
					sortMemWritten: -1,
				},
			);
		}

		for (let i = size - 1; i >= 0; i--) {
			const tIndex =
				Math.floor(dataset[i] / digit) % 10;
			sortMemory[auxiMemory[tIndex] - 1] =
				dataset[i];

			memReadCount++;
			memReadCount++;
			memWriteCount++;
			generateFrameState(
				<Fragment>
					Wrote <code>{dataset[i]}</code> to{" "}
					<code>
						sortMemory[{auxiMemory[tIndex] - 1}]
					</code>
					.
				</Fragment>,
				{
					mainMemRead: i,
					mainMemWritten: -1,
					auxiMemRead: tIndex,
					auxiMemWritten: i,
					sortMemRead: -1,
					sortMemWritten: auxiMemory[tIndex] - 1,
				},
			);

			auxiMemory[tIndex]--;

			memReadCount++;
			memWriteCount++;
			generateFrameState(
				<Fragment>
					Decremented{" "}
					<code>auxiMemory[{tIndex}]</code> by
					one.
				</Fragment>,
				{
					mainMemRead: i,
					mainMemWritten: -1,
					auxiMemRead: -1,
					auxiMemWritten: tIndex,
					sortMemRead: -1,
					sortMemWritten: -1,
				},
			);
		}

		for (let i = 0; i < size; i++) {
			dataset[i] = sortMemory[i];

			memReadCount++;
			memWriteCount++;
			generateFrameState(
				<Fragment>
					Wrote <code>{sortMemory[i]}</code> to{" "}
					<code>input[{i}]</code>.
				</Fragment>,
				{
					mainMemRead: -1,
					mainMemWritten: i,
					auxiMemRead: -1,
					auxiMemWritten: -1,
					sortMemRead: i,
					sortMemWritten: -1,
				},
			);
		}
	};

	generateFrameState(
		<Fragment>
			Unsorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		{
			mainMemRead: -1,
			mainMemWritten: -1,
			auxiMemRead: -1,
			auxiMemWritten: -1,
			sortMemRead: -1,
			sortMemWritten: -1,
		},
	);

	for (
		let digit = 1;
		Math.floor(maxValue / digit) > 0;
		digit *= 10
	) {
		countSort(digit);
	}

	generateFrameState(
		<Fragment>
			Sorted <code>input[0:{size - 1}]</code>
		</Fragment>,
		{
			mainMemRead: -1,
			mainMemWritten: -1,
			auxiMemRead: -1,
			auxiMemWritten: -1,
			sortMemRead: -1,
			sortMemWritten: -1,
		},
	);
};
