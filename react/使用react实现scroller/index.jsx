import React, { useState, useImperativeHandle, forwardRef, useCallback, useRef, useLayoutEffect, useMemo } from 'react';

import styled from 'styled-components';

import { PreIcon, NextIcon } from './icon-com';

// import scrollIntoView from 'smooth-scroll-into-view-if-needed';

import VisibleItemMap from './visible-item-map';

const Tab = styled.div`
    font-size: 13px;
    padding: 9px 0px;
    cursor: pointer;
    border: 0;
    outline: 0;
    margin-right: 24px;
    ${({ active }) =>
        active &&
        `
    border-bottom: 2px solid #1880FF;
  `}
    .category {
        font-size: 13px;
        color: #6f7592;
        line-height: 22px;

        ${({ active }) => active && `color: #1880FF;`}
    }
`;
const ButtonGroup = styled.div`
    display: flex;
    overflow-y: hidden;
    border-bottom: 1px solid #eef0f6;
`;

const Button = styled.button`
    line-height: 1.5715;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    user-select: none;
    touch-action: manipulation;
    height: 42px;
    padding: 4px 15px;
    font-size: 14px;
    border-radius: 2px;
    padding: 4px 0;
    color: rgba(29, 39, 84, 0.85);
    border-color: transparent;
    background: 0 0;
    box-shadow: none;

    ${({ disabled }) =>
        disabled &&
        `
    cursor: not-allowed;
    color: rgba(29, 39, 84,.25);
    border-color: transparent;
    background: 0 0;
    text-shadow: none;
    box-shadow: none;
  `}
`;

const LeftArrow = styled(Button)`
    width: 24px;
`;

const RightArrow = styled(Button)`
    width: 24px;
`;

const ScrollInner = styled.div`
    overflow-x: scroll;
    display: flex;
    height: max-content;
    overflow-y: hidden;
    position: relative;
    width: 100%;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const defaultRadio = 0.9;

const Scroller = forwardRef((props, ref) => {
    const { menus, active, setActive } = props;

    const [visibleElements, setVisibleElements] = useState([]);

    const refs = useRef({});

    const observer = useRef();

    const itemsRef = useRef(new VisibleItemMap());

    const [renderItems, setRenderItems] = useState();

    const throttleTimer = useRef();

    useImperativeHandle(ref, () => ({
        getActive: () => active
    }));

    const scrollHandler = useCallback(entries => {
        // console.log(entries);
    }, []);

    const observerHandler = useCallback(
        entries => {
            const items = observerEntriesToItems(entries);
            itemsRef.current.set(items);
            setRenderItems(items);

            clearTimeout(throttleTimer.current);

            throttleTimer.current = setTimeout(() => {
                window.requestAnimationFrame(() => {
                    const visibleItems = itemsRef.current.getVisible().map(item => item[1].key);

                    if (JSON.stringify(visibleElements) !== JSON.stringify(visibleItems)) {
                        setVisibleElements(visibleItems);
                    }
                });
            }, 500);
        },
        [visibleElements, itemsRef]
    );

    const scrollToItem = useCallback(item => {
        const _item = item?.entry?.target || item;

        if (_item) {
            _item.scrollIntoView({
                block: 'nearest',
                inline: 'end',
                behavior: 'smooth'
            });
        }
    }, []);

    const scrollToPrev = useCallback(() => {
        const prevItem = itemsRef.current.prev(itemsRef.current.getVisible()?.[0]?.[1]);
        scrollToItem(prevItem);
    }, [scrollToItem]);

    const scrollToNext = useCallback(() => {
        const nextItem = itemsRef.current.next(itemsRef.current.getVisible()?.slice?.(-1)?.[0]?.[1]);
        scrollToItem(nextItem);
    }, [scrollToItem]);

    const observerEntriesToItems = entries => {
        return entries.map(entry => {
            const { target } = entry;
            const key = target.getAttribute('data-key');
            const index = target.getAttribute('data-index');
            return [
                key,
                {
                    key,
                    index,
                    entry,
                    visible: entry.intersectionRatio >= defaultRadio
                }
            ];
        });
    };

    useLayoutEffect(() => {
        if (!window.IntersectionObserver) return;
        const result = Object.values(refs.current)
            .map(el => el)
            .filter(Boolean);

        const observerInstance =
            observer.current ||
            new window.IntersectionObserver(observerHandler, { threshold: [0.05, 0.5, 0.75, 0.95] });

        observer.current = observerInstance;

        result.forEach(el => observerInstance.observe(el));

        return function() {
            clearTimeout(throttleTimer.current);
            observerInstance.disconnect();
            observer.current = null;
        };
    }, [observerHandler]);

    const firstItemVisible = useMemo(() => !!itemsRef.current.first()?.visible, [renderItems]);

    const lastItemVisible = useMemo(() => !!itemsRef.current.last()?.visible, [renderItems]);

    return (
        <ButtonGroup>
            <LeftArrow onClick={scrollToPrev} disabled={firstItemVisible}>
                <PreIcon />
            </LeftArrow>
            <ScrollInner onScroll={scrollHandler}>
                {menus.map(({ category }, i) => (
                    <Tab
                        key={category}
                        data-key={category}
                        data-index={i}
                        ref={node => (refs.current[category] = node)}
                        active={active === category}
                        onClick={() => setActive(category)}>
                        <div className="menu">
                            <div className="category">{category}</div>
                        </div>
                    </Tab>
                ))}
            </ScrollInner>
            <RightArrow onClick={scrollToNext} disabled={lastItemVisible}>
                <NextIcon />
            </RightArrow>
        </ButtonGroup>
    );
});

export default Scroller;
