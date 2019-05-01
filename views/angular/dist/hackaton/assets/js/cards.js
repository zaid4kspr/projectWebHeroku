			(function() {
				
				var support = { animations : Modernizr.cssanimations },
					animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
					animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
					onEndAnimation = function( el, callback ) {
						var onEndCallbackFn = function( ev ) {
							if( support.animations ) {
								if(ev.target != this) return;
								this.removeEventListener( animEndEventName, onEndCallbackFn);
							}
							if(callback && typeof callback === 'function') {callback.call();}
						};
						if( support.animations ) {
							el.addEventListener(animEndEventName, onEndCallbackFn);
						}
						else {
							onEndCallbackFn();
						}
					};

				function nextSibling(el) {
					var nextSibling = el.nextSibling;
					while(nextSibling && nextSibling.nodeType != 1) {
					nextSibling = nextSibling.nextSibling
					}
					return nextSibling;
				}

				var slamet = new Stack(document.getElementById('stack_slamet'), {
						infinite: false,
						perspective: 1400,
						onEndStack: function(instance) {
							setTimeout(function() {
								instance.restart();
								document.querySelector('#counter > .counter__number').innerHTML = 0;
							}, 300);
						}
					});

				// controls the click ring effect on the button
				var buttonClickCallback = function(bttn) {
					var bttn = bttn || this;
					bttn.setAttribute('data-state', 'unlocked');
				};

				document.querySelector('.button--accept[data-stack = stack_slamet]').addEventListener(clickeventtype, function(ev) { 
					var callback = function() {
						// increment counter
						var counter = document.querySelector('#counter > .counter__number'),
							count = parseInt(counter.innerHTML);
						counter.innerHTML = count + 1;

						buttonClickCallback(ev.target);
					};
					slamet.accept(callback);
				});
				document.querySelector('.button--reject[data-stack = stack_slamet]').addEventListener(clickeventtype, function() { slamet.reject(buttonClickCallback.bind(this)); });

				[].slice.call(document.querySelectorAll('.button--sonar')).forEach(function(bttn) {
					bttn.addEventListener(clickeventtype, function() {
						bttn.setAttribute('data-state', 'locked');
					});
				});

				[].slice.call(document.querySelectorAll('.button--material')).forEach(function(bttn) {
					var radialAction = nextSibling(bttn.parentNode);

					bttn.addEventListener(clickeventtype, function(ev) {
						var boxOffset = radialAction.parentNode.getBoundingClientRect(),
							offset = bttn.getBoundingClientRect();

						radialAction.style.left = Number(offset.left - boxOffset.left) + 'px';
						radialAction.style.top = Number(offset.top - boxOffset.top) + 'px';

						classie.add(radialAction, classie.has(bttn, 'button--reject') ? 'material-circle--reject' : 'material-circle--accept');
						classie.add(radialAction, 'material-circle--active');
						onEndAnimation(radialAction, function() {
							classie.remove(radialAction, classie.has(bttn, 'button--reject') ? 'material-circle--reject' : 'material-circle--accept');
							classie.remove(radialAction, 'material-circle--active');
						});
					});
				});
			})();

			$('.button--quiz').on('click', function(){
				$(this).addClass('button--hidden');
				$(this).siblings('.button--accept').removeClass('button--hidden');
				$('.stack__item--current .job-content').addClass('button--hidden');
				$('.stack__item--current .job-quiz').removeClass('button--hidden');
				$('.stack__item--current .job-quiz').addClass('animated flash');
			});

			$('.button--accept').on('click', function(){
				$(this).addClass('button--hidden');
				$(this).siblings('.button--quiz').removeClass('button--hidden');
			});

			$('.question-list li a').on('click', function(){
				$('.question-list li a').removeClass('answer-selected');
				$('.question-list li a').addClass('answer-not-selected');
				$(this).addClass('answer-selected');
			});