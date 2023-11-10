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

	const auxiliaryMemory: number[] = [];
	const sortedAuxiliaryMemory: number[] = [];

	const generateFrameState = (
		frameDescription: ReactNode,
		indexDetails: IndexDetails,
	): void => {
		frameStates.push({
			frameDescription,
			elementStates: [...dataset],
			auxStates: [...auxiliaryMemory],
			sortedAuxStates: [...sortedAuxiliaryMemory],
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

	const sortedXs: number[] = [];
	for (let i = 0; i <= maxValue; i++) {
		auxiliaryMemory[i] = 0;
	}

	for (let i = 0; i <= maxValue; i++) {
		auxiliaryMemory[dataset[i]]++;
		generateFrameState(
			<Fragment>
				Increment <code>input[{dataset[i]}]</code>{" "}
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
		auxiliaryMemory[i] += auxiliaryMemory[i - 1];

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
		sortedXs[auxiliaryMemory[dataset[i]]] =
			dataset[i];
		memReadCount++;
		memWriteCount++;
		generateFrameState(
			<Fragment>
				Write <code>input[{i}]</code> to{" "}
				<code>
					sortedAux[{auxiliaryMemory[dataset[i]]}]
				</code>
				.
			</Fragment>,
			{
				memRead: i,
				memWrite: -1,
				memAuxRead: -1,
				memAuxWrite: -1,
				memSortedAuxRead: 0,
				memSortedAuxWrite:
					auxiliaryMemory[dataset[i]],
			},
		);

		auxiliaryMemory[dataset[i]]--;
	}

	for (let i = 0; i < size; i++) {
		dataset[i] = sortedXs[i];

		memReadCount++;
		memWriteCount++;
		generateFrameState(
			<Fragment>
				Write
				<code>sortedAux[{i}]</code> to{" "}
				<code>input[{i}]</code>.
			</Fragment>,
			{
				memRead: 0,
				memWrite: i,
				memAuxRead: 0,
				memAuxWrite: 0,
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
