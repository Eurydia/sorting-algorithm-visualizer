import { Fragment, ReactNode } from "react";

type IndexDetails = {
	workingRegion: number[];
	compared: number[];
	mainMemRead: number;
	mainMemWrote: number;
	auxiMemRead: number;
	auxiMemWrote: number;
};

export type FrameState = IndexDetails & {
	frameDescription: ReactNode;
	mainElementStates: number[];
	auxiElementStates: number[];
	memWriteCount: number;
	memReadCount: number;
	comparisonCount: number;
};

export const mergeSort = (
	dataset: number[],
	size: number,
	frameStates: FrameState[],
) => {
	let memWriteCount: number = 0;
	let memReadCount: number = 0;
	let comparisonCount: number = 0;

	let auxiMemory: number[] = [];

	const generateFrameState = (
		frameDescription: ReactNode,
		indexDetails: IndexDetails,
	): void => {
		frameStates.push({
			frameDescription,
			auxiElementStates: [...auxiMemory],
			mainElementStates: [...dataset],
			memWriteCount,
			memReadCount,
			comparisonCount,

			...indexDetails,
		});
	};

	const __top_down_merge_sort = (
		startIndex: number,
		endIndex: number,
	): void => {
		generateFrameState(
			<Fragment>
				Consider elements between{" "}
				<code>
					input[{startIndex}:{endIndex}]
				</code>
				.
			</Fragment>,
			{
				workingRegion: [startIndex, endIndex],
				compared: [],
				mainMemRead: -1,
				mainMemWrote: -1,
				auxiMemRead: -1,
				auxiMemWrote: -1,
			},
		);

		if (endIndex - startIndex === 0) {
			return;
		}

		const middleIndex: number = Math.floor(
			(startIndex + endIndex) / 2,
		);

		__top_down_merge_sort(
			startIndex,
			middleIndex,
		);

		__top_down_merge_sort(
			middleIndex + 1,
			endIndex,
		);

		let lPtr: number = startIndex;
		let rPtr: number = middleIndex + 1;
		let auxPtr: number = 0;
		auxiMemory = [];

		while (
			lPtr <= middleIndex &&
			rPtr <= endIndex
		) {
			comparisonCount++;
			generateFrameState(
				<Fragment>
					Compared <code>input[{lPtr}]</code>{" "}
					against <code>input[{rPtr}]</code>.
				</Fragment>,
				{
					workingRegion: [startIndex, endIndex],
					compared: [lPtr, rPtr],
					mainMemRead: -1,
					mainMemWrote: -1,
					auxiMemRead: -1,
					auxiMemWrote: -1,
				},
			);
			if (dataset[lPtr] > dataset[rPtr]) {
				memReadCount++;
				memWriteCount++;
				auxiMemory[auxPtr] = dataset[rPtr];

				generateFrameState(
					<Fragment>
						Wrote <code>input[{rPtr}]</code> to{" "}
						<code>auxMem[{auxPtr}]</code>.
					</Fragment>,
					{
						workingRegion: [startIndex, endIndex],
						compared: [],
						mainMemRead: rPtr,
						mainMemWrote: -1,
						auxiMemRead: -1,
						auxiMemWrote: auxPtr,
					},
				);

				auxPtr++;
				rPtr++;
				continue;
			}

			memReadCount++;
			memWriteCount++;
			auxiMemory[auxPtr] = dataset[lPtr];
			generateFrameState(
				<Fragment>
					Wrote <code>input[{lPtr}]</code> to{" "}
					<code>auxMem[{auxPtr}]</code>.
				</Fragment>,
				{
					workingRegion: [startIndex, endIndex],
					compared: [],
					mainMemRead: lPtr,
					mainMemWrote: -1,
					auxiMemRead: -1,
					auxiMemWrote: auxPtr,
				},
			);

			lPtr++;
			auxPtr++;
		}

		while (lPtr <= middleIndex) {
			memReadCount++;
			memWriteCount++;

			auxiMemory[auxPtr] = dataset[lPtr];

			generateFrameState(
				<Fragment>
					Wrote <code>input[{lPtr}]</code> to{" "}
					<code>auxMem[{auxPtr}]</code>.
				</Fragment>,
				{
					workingRegion: [startIndex, endIndex],
					compared: [],
					mainMemRead: lPtr,
					mainMemWrote: -1,
					auxiMemRead: -1,
					auxiMemWrote: auxPtr,
				},
			);

			lPtr++;
			auxPtr++;
		}

		while (rPtr <= endIndex) {
			memReadCount++;
			memWriteCount++;
			auxiMemory[auxPtr] = dataset[rPtr];

			generateFrameState(
				<Fragment>
					Wrote <code>input[{lPtr}]</code> to{" "}
					<code>auxMem[{auxPtr}]</code>.
				</Fragment>,
				{
					workingRegion: [startIndex, endIndex],
					compared: [],
					mainMemRead: rPtr,
					mainMemWrote: -1,
					auxiMemRead: -1,
					auxiMemWrote: auxPtr,
				},
			);

			rPtr++;
			auxPtr++;
		}

		for (let i = 0; i < auxPtr; i++) {
			memReadCount++;
			memWriteCount++;
			dataset[startIndex + i] = auxiMemory[i];
			generateFrameState(
				<Fragment>
					Wrote <code>auxMem[{i}]</code> to{" "}
					<code>input[{startIndex + i}]</code>.
				</Fragment>,
				{
					workingRegion: [startIndex, endIndex],
					compared: [],
					mainMemRead: -1,
					mainMemWrote: startIndex + i,
					auxiMemRead: i,
					auxiMemWrote: -1,
				},
			);
		}
	};

	generateFrameState(
		<Fragment>
			Unsorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		{
			workingRegion: [],
			compared: [],
			mainMemRead: -1,
			mainMemWrote: -1,
			auxiMemRead: -1,
			auxiMemWrote: -1,
		},
	);

	__top_down_merge_sort(0, size - 1);

	auxiMemory = [];

	generateFrameState(
		<Fragment>
			Sorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		{
			workingRegion: [],
			compared: [],
			mainMemRead: -1,
			mainMemWrote: -1,
			auxiMemRead: -1,
			auxiMemWrote: -1,
		},
	);
};
