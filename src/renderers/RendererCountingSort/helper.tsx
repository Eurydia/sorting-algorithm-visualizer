import { Fragment, ReactNode } from "react";

type IndexDetails = {
	memRead: number;
	memWrite: number;
	memAuxRead: number;
	memAuxWrite: number;
	memSortedAuxRead: number;
	memSortedAuxWrite: number;
};

export type FrameState = IndexDetails & {
	frameDescription: ReactNode;
	elementStates: number[];
	auxStates: number[];
	sortedAuxStates: number[];
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

	const auxMemory: number[] = Array(maxValue);
	const sortedAuxMemory: number[] = [];

	const generateFrameState = (
		frameDescription: ReactNode,
		indexDetails: IndexDetails,
	): void => {
		frameStates.push({
			frameDescription,
			elementStates: [...dataset],
			auxStates: [...auxMemory],
			sortedAuxStates: [...sortedAuxMemory],
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
			memRead: -1,
			memWrite: -1,
			memAuxRead: -1,
			memAuxWrite: -1,
			memSortedAuxRead: -1,
			memSortedAuxWrite: -1,
		},
	);

	for (let i = 1; i < maxValue; i++) {
		auxMemory[i] = 0;
	}

	for (let i = 1; i <= maxValue; i++) {
		auxMemory[dataset[i]]++;
		generateFrameState(
			<Fragment>
				Increment{" "}
				<code>
					input[{auxMemory[dataset[i]]}]
				</code>{" "}
				by one.
			</Fragment>,
			{
				memRead: -1,
				memWrite: -1,
				memAuxRead: -1,
				memAuxWrite: -1,
				memSortedAuxRead: -1,
				memSortedAuxWrite: -1,
			},
		);
	}

	generateFrameState(
		<Fragment>
			Prepare prefix sum array from{" "}
			<code>aux[0:{size - 1}]</code>.
		</Fragment>,
		{
			memRead: -1,
			memWrite: -1,
			memAuxRead: -1,
			memAuxWrite: -1,
			memSortedAuxRead: -1,
			memSortedAuxWrite: -1,
		},
	);

	for (let i = 1; i <= maxValue; i++) {
		auxMemory[i] += auxMemory[i - 1];

		memReadCount++;
		memWriteCount++;
		generateFrameState(
			<Fragment>
				Write{" "}
				<code>
					aux[{i}] + aux[{i + 1}]
				</code>{" "}
				to <code>aux[{i + 1}]</code>.
			</Fragment>,
			{
				memRead: -1,
				memWrite: -1,
				memAuxRead: i,
				memAuxWrite: i + 1,
				memSortedAuxRead: -1,
				memSortedAuxWrite: -1,
			},
		);
	}

	for (let i = 0; i < size; i++) {
		sortedAuxMemory[auxMemory[dataset[i]]] =
			dataset[i];

		memReadCount++;
		memWriteCount++;
		generateFrameState(
			<Fragment>
				Write <code>input[{i}]</code> to{" "}
				<code>
					sortedAux[{auxMemory[dataset[i]]}]
				</code>
				.
			</Fragment>,
			{
				memRead: i,
				memWrite: -1,
				memAuxRead: -1,
				memAuxWrite: -1,
				memSortedAuxRead: 0,
				memSortedAuxWrite: auxMemory[dataset[i]],
			},
		);

		auxMemory[dataset[i]]--;
	}

	for (let i = 0; i < size; i++) {
		dataset[i] = sortedAuxMemory[i];

		memReadCount++;
		memWriteCount++;
		generateFrameState(
			<Fragment>
				Write
				<code>sortedAux[{i}]</code> to{" "}
				<code>input[{i}]</code>.
			</Fragment>,
			{
				memRead: -1,
				memWrite: i,
				memAuxRead: -1,
				memAuxWrite: -1,
				memSortedAuxRead: i,
				memSortedAuxWrite: -1,
			},
		);
	}

	generateFrameState(
		<Fragment>
			Sorted <code>input[0:{size - 1}]</code>
		</Fragment>,
		{
			memRead: -1,
			memWrite: -1,
			memAuxRead: -1,
			memAuxWrite: -1,
			memSortedAuxRead: -1,
			memSortedAuxWrite: -1,
		},
	);
};
