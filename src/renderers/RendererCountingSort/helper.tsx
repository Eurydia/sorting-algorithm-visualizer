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

export const countingSort = (
	dataset: number[],
	size: number,
	frameStates: FrameState[],
): void => {
	const maxValue = Math.max(...dataset);

	let memWriteCount: number = 0;
	let memReadCount: number = 0;

	const auxiMemory: number[] = [];
	const sortMemory: number[] = [];

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

	for (let i = 0; i <= maxValue; i++) {
		auxiMemory[i] = 0;
		memWriteCount++;
		generateFrameState(
			<Fragment>
				Wrote 0 to <code>auxiMemory[{i}]</code>.
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
		auxiMemory[dataset[i]]++;

		memReadCount++;
		memWriteCount++;
		generateFrameState(
			<Fragment>
				Increased{" "}
				<code>auxiMemory[{dataset[i]}]</code> by
				one.
			</Fragment>,
			{
				mainMemRead: i,
				mainMemWritten: -1,
				auxiMemRead: -1,
				auxiMemWritten: dataset[i],
				sortMemRead: -1,
				sortMemWritten: -1,
			},
		);
	}

	for (let i = 1; i <= maxValue; i++) {
		auxiMemory[i] += auxiMemory[i - 1];

		memReadCount++;
		memWriteCount++;
		generateFrameState(
			<Fragment>
				Increased <code>auxiMemory[{i}]</code> by{" "}
				<code>auxiMemory[{i - 1}]</code>
			</Fragment>,
			{
				mainMemRead: -1,
				mainMemWritten: -1,
				auxiMemRead: i,
				auxiMemWritten: i + 1,
				sortMemRead: -1,
				sortMemWritten: -1,
			},
		);
	}

	for (let i = size - 1; i >= 0; i--) {
		sortMemory[auxiMemory[dataset[i]] - 1] =
			dataset[i];

		auxiMemory[dataset[i]]--;

		memReadCount++;
		memReadCount++;
		memWriteCount++;
		generateFrameState(
			<Fragment>
				Wrote <code>input[{i}]</code> to{" "}
				<code>
					sortedMemory[
					{auxiMemory[dataset[i]] - 1}]
				</code>
				.
			</Fragment>,
			{
				mainMemRead: i,
				mainMemWritten: -1,
				auxiMemRead: dataset[i],
				auxiMemWritten: -1,
				sortMemRead: -1,
				sortMemWritten:
					auxiMemory[dataset[i]] - 1,
			},
		);

		auxiMemory[dataset[i]]--;

		memReadCount++;
		memWriteCount++;
		generateFrameState(
			<Fragment>
				Decreased{" "}
				<code>auxiMemory[{dataset[i]}]</code> by
				one.
			</Fragment>,
			{
				mainMemRead: i,
				mainMemWritten: -1,
				auxiMemRead: -1,
				auxiMemWritten: dataset[i],
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
				Wrote
				<code>sortMemory[{i}]</code> to{" "}
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
