import { ReactNode, Fragment } from "react";

type IndexDetails = {
	compared: number[];
	swapped: number[];
	parentElement: number;
	childrenElements: number[];
	rightMostUnsortedElement: number;
};

export type FrameState = IndexDetails & {
	frameDescription: ReactNode;
	elementStates: number[];
	swapCount: number;
	comparisonCount: number;
};

export const heapSort = (
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

	const __heapsort_rebuild = (
		_size: number,
		parentIndex: number,
	): void => {
		while (parentIndex * 2 + 1 < _size) {
			const leftChildIndex: number =
				parentIndex * 2 + 1;
			const rightChildIndex: number =
				leftChildIndex + 1;

			// generateFrameState(
			// 	<Fragment>
			// 		Consider{" "}
			// 		<code>input[{parentIndex}]</code> as a
			// 		parent.
			// 	</Fragment>,
			// 	{
			// 		compared: [],
			// 		swapped: [],
			// 		parentElement: parentIndex,
			// 		childElement: [
			// 			parentIndex * 2 + 1,
			// 			rightChildIndex < _size
			// 				? rightChildIndex
			// 				: -1,
			// 		],
			// 		rightMostUnsortedElement: _size - 1,
			// 	},
			// );

			let targetChildIndex: number =
				leftChildIndex;

			if (leftChildIndex + 1 < _size) {
				comparisonCount++;
				generateFrameState(
					<Fragment>
						Compared{" "}
						<code>input[{leftChildIndex}]</code>{" "}
						against{" "}
						<code>input[{rightChildIndex}]</code>.
					</Fragment>,
					{
						compared: [
							leftChildIndex,
							leftChildIndex + 1,
						],
						swapped: [],
						parentElement: parentIndex,
						childrenElements: [
							leftChildIndex,
							rightChildIndex,
						],
						rightMostUnsortedElement: _size - 1,
					},
				);

				if (
					dataset[leftChildIndex] <
					dataset[leftChildIndex + 1]
				) {
					targetChildIndex++;
				}
			}

			generateFrameState(
				<Fragment>
					Compared{" "}
					<code>input[{parentIndex}]</code>{" "}
					against{" "}
					<code>input[{targetChildIndex}]</code>.
				</Fragment>,
				{
					compared: [
						parentIndex,
						targetChildIndex,
					],
					swapped: [],
					parentElement: parentIndex,
					childrenElements: [
						leftChildIndex,
						rightChildIndex < _size
							? rightChildIndex
							: -1,
					],
					rightMostUnsortedElement: _size - 1,
				},
			);

			if (
				dataset[parentIndex] >=
				dataset[targetChildIndex]
			) {
				return;
			}

			const a: number = dataset[parentIndex];
			const b: number = dataset[targetChildIndex];
			dataset[parentIndex] = b;
			dataset[targetChildIndex] = a;

			swapCount++;
			generateFrameState(
				<Fragment>
					Swapped{" "}
					<code>input[{parentIndex}]</code> and{" "}
					<code>input[{targetChildIndex}]</code>.
				</Fragment>,
				{
					compared: [],
					swapped: [
						parentIndex,
						targetChildIndex,
					],
					parentElement: parentIndex,
					childrenElements: [
						leftChildIndex,
						rightChildIndex < _size
							? rightChildIndex
							: -1,
					],
					rightMostUnsortedElement: _size - 1,
				},
			);

			parentIndex = targetChildIndex;
		}
	};

	generateFrameState(
		<Fragment>
			Unsorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		{
			compared: [],
			swapped: [],
			parentElement: -1,
			childrenElements: [],
			rightMostUnsortedElement: -1,
		},
	);

	for (let i = size - 1; i >= 0; i--) {
		__heapsort_rebuild(size, i);
	}

	for (let i = size - 1; i > 0; i--) {
		const a: number = dataset[0];
		const b: number = dataset[i];
		dataset[0] = b;
		dataset[i] = a;

		swapCount++;
		generateFrameState(
			<Fragment>
				Swapped <code>input[0]</code> and{" "}
				<code>input[{i}]</code>.
			</Fragment>,
			{
				compared: [],
				swapped: [0, i],
				parentElement: -1,
				childrenElements: [],
				rightMostUnsortedElement: -1,
			},
		);

		__heapsort_rebuild(i, 0);
	}

	generateFrameState(
		<Fragment>
			Sorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		{
			compared: [],
			swapped: [],
			parentElement: -1,
			childrenElements: [],
			rightMostUnsortedElement: -1,
		},
	);
};
