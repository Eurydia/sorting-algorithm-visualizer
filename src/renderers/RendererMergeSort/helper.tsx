import { Fragment, ReactNode } from "react";

type IndexDetails = {
	workingRegion: number[];
	compared: number[];
	memRead: number;
	memWrite: number;
	memAuxRead: number;
	memAuxWrite: number;
};

export type FrameState = IndexDetails & {
	frameDescription: ReactNode;
	elementStates: number[];
	auxStates: number[];
	memWriteCount: number;
	memReadCount: number;
	comparisonCount: number;
};

export const mergeSort = (
	xs: number[],
	size: number,
	frameStates: FrameState[],
) => {
	let memWriteCount: number = 0;
	let memReadCount: number = 0;
	let comparisonCount: number = 0;

	const generateFrameState = (
		frameDescription: ReactNode,
		auxMemory: number[],
		indexDetails: IndexDetails,
	): void => {
		frameStates.push({
			frameDescription,
			auxStates: auxMemory,
			elementStates: [...xs],
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
			[],
			{
				workingRegion: [startIndex, endIndex],
				compared: [],
				memRead: -1,
				memWrite: -1,
				memAuxRead: -1,
				memAuxWrite: -1,
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
		const auxMemory = [];

		while (
			lPtr <= middleIndex &&
			rPtr <= endIndex
		) {
			comparisonCount++;
			generateFrameState(
				<Fragment>
					Compare <code>input[{lPtr}]</code>{" "}
					against <code>input[{rPtr}]</code>.
				</Fragment>,
				[...auxMemory],
				{
					workingRegion: [startIndex, endIndex],
					compared: [lPtr, rPtr],
					memRead: -1,
					memWrite: -1,
					memAuxRead: -1,
					memAuxWrite: -1,
				},
			);
			if (xs[lPtr] > xs[rPtr]) {
				memReadCount++;
				memWriteCount++;
				auxMemory[auxPtr] = xs[rPtr];

				generateFrameState(
					<Fragment>
						Write <code>input[{rPtr}]</code> to{" "}
						<code>auxMem[{auxPtr}]</code>.
					</Fragment>,
					[...auxMemory],

					{
						workingRegion: [startIndex, endIndex],
						compared: [],
						memRead: rPtr,
						memWrite: -1,
						memAuxRead: -1,
						memAuxWrite: auxPtr,
					},
				);

				auxPtr++;
				rPtr++;
				continue;
			}

			memReadCount++;
			memWriteCount++;
			auxMemory[auxPtr] = xs[lPtr];
			generateFrameState(
				<Fragment>
					Write <code>input[{lPtr}]</code> to{" "}
					<code>auxMem[{auxPtr}]</code>.
				</Fragment>,
				[...auxMemory],
				{
					workingRegion: [startIndex, endIndex],
					compared: [],
					memRead: lPtr,
					memWrite: -1,
					memAuxRead: -1,
					memAuxWrite: auxPtr,
				},
			);

			lPtr++;
			auxPtr++;
		}

		while (lPtr <= middleIndex) {
			memReadCount++;
			memWriteCount++;

			auxMemory[auxPtr] = xs[lPtr];

			generateFrameState(
				<Fragment>
					Write <code>input[{lPtr}]</code> to{" "}
					<code>auxMem[{auxPtr}]</code>.
				</Fragment>,
				[...auxMemory],
				{
					workingRegion: [startIndex, endIndex],
					compared: [],
					memRead: lPtr,
					memWrite: -1,
					memAuxRead: -1,
					memAuxWrite: auxPtr,
				},
			);

			lPtr++;
			auxPtr++;
		}

		while (rPtr <= endIndex) {
			memReadCount++;
			memWriteCount++;
			auxMemory[auxPtr] = xs[rPtr];

			generateFrameState(
				<Fragment>
					Write <code>input[{lPtr}]</code> to{" "}
					<code>auxMem[{auxPtr}]</code>.
				</Fragment>,
				[...auxMemory],
				{
					workingRegion: [startIndex, endIndex],
					compared: [],
					memRead: rPtr,
					memWrite: -1,
					memAuxRead: -1,
					memAuxWrite: auxPtr,
				},
			);

			rPtr++;
			auxPtr++;
		}

		for (let i = 0; i < auxPtr; i++) {
			memReadCount++;
			memWriteCount++;
			xs[startIndex + i] = auxMemory[i];
			generateFrameState(
				<Fragment>
					Write <code>auxMem[{i}]</code> to{" "}
					<code>input[{startIndex + i}]</code>.
				</Fragment>,
				[...auxMemory],
				{
					workingRegion: [startIndex, endIndex],
					compared: [],
					memRead: -1,
					memWrite: startIndex + i,
					memAuxRead: i,
					memAuxWrite: -1,
				},
			);
		}
	};

	generateFrameState(
		<Fragment>
			Unsorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		[],
		{
			workingRegion: [],
			compared: [],
			memRead: -1,
			memWrite: -1,
			memAuxRead: -1,
			memAuxWrite: -1,
		},
	);

	__top_down_merge_sort(0, size - 1);

	generateFrameState(
		<Fragment>
			Sorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		[],
		{
			workingRegion: [],
			compared: [],
			memRead: -1,
			memWrite: -1,
			memAuxRead: -1,
			memAuxWrite: -1,
		},
	);
};
