# Code Review 2

## Tests
	- Careful with {force:true} in test db syncs
	- Why so many commented out tests? Broken? Don't conform to code?
	- If generating event handler spies, make sure you test them


## Back-End
	- Seem to be crafting a RESTful API for weapons, but pub/sub for game logic
	- Make sure initial state accounts for all possible fields that can change 
	- Associations are still convoluted
	- Love the thunkish socket listeners! How do they interface with redux?


## Front-end
	
### Redux 
	-remove client keep immutable (no splice). How can we achieve this with FP?
	- When new player joins game, will they have access to full store state? What does store state look like?

### Phaser
	- Make InputManager a class
	- Convert to es6
	- hardcoded values in player.js should be refactored out and passed in as args and imported from seperate config obj/class
	- How are we accounting for health + win/loss conditions?

### React
	- Is Character container getting equipment info from store? If not, why not?

### Deployment
	- How are we serving bundle... postinstall webpack hook?

## Product
	- Git hooks?
	- How does equipment API sync up with gameplay?
	- Ideal device?



